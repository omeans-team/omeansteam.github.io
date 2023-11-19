<?php
/**
 * CBaseController class file.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @link http://www.yiiframework.com/
 * @copyright Copyright &copy; 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */


/**
 * CBaseController is the base class for {@link CController} and {@link CWidget}.
 *
 * It provides the common functionalities shared by controllers who need to render views.
 *
 * CBaseController also implements the support for the following features:
 * <ul>
 * <li>{@link CClipWidget Clips} : a clip is a piece of captured output that can be inserted elsewhere.</li>
 * <li>{@link CWidget Widgets} : a widget is a self-contained sub-controller with its own view and model.</li>
 * <li>{@link COutputCache Fragment cache} : fragment cache selectively caches a portion of the output.</li>
 * </ul>
 *
 * To use a widget in a view, use the following in the view:
 * <pre>
 * $this->widget('path.to.widgetClass',array('property1'=>'value1',...));
 * </pre>
 * or
 * <pre>
 * $this->beginWidget('path.to.widgetClass',array('property1'=>'value1',...));
 * // ... display other contents here
 * $this->endWidget();
 * </pre>
 *
 * To create a clip, use the following:
 * <pre>
 * $this->beginClip('clipID');
 * // ... display the clip contents
 * $this->endClip();
 * </pre>
 * Then, in a different view or place, the captured clip can be inserted as:
 * <pre>
 * echo $this->clips['clipID'];
 * </pre>
 *
 * To use fragment cache, do as follows,
 * <pre>
 * if($this->beginCache('cacheID',array('property1'=>'value1',...))
 * {
 *     // ... display the content to be cached here
 *    $this->endCache();
 * }
 * </pre>
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @version $Id$
 * @package system.web
 * @since 1.0
 */
abstract class CBaseController extends CComponent
{
	private $_widgetStack=array();

	/**
	 * Returns the view script file according to the specified view name.
	 * This method must be implemented by child classes.
	 * @param string view name
	 * @return string the file path for the named view. False if the view cannot be found.
	 */
	abstract public function getViewFile($viewName);


	/**
	 * Renders a view file.
	 *
	 * @param string view file path
	 * @param array data to be extracted and made available to the view
	 * @param boolean whether the rendering result should be returned instead of being echoed
	 * @return string the rendering result. Null if the rendering result is not required.
	 * @throws CException if the view file does not exist
	 */
	public function renderFile($viewFile,$data=null,$return=false)
	{
		$widgetCount=count($this->_widgetStack);
		if(($renderer=Yii::app()->getViewRenderer())!==null)
			$content=$renderer->renderFile($this,$viewFile,$data,$return);
		else
			$content=$this->renderInternal($viewFile,$data,$return);
		if(count($this->_widgetStack)===$widgetCount)
			return $content;
		else
		{
			$widget=end($this->_widgetStack);
			throw new CException(Yii::t('yii','{controller} contains improperly nested widget tags in its view "{view}". A {widget} widget does not have an endWidget() call.',
				array('{controller}'=>get_class($this), '{view}'=>$viewFile, '{widget}'=>get_class($widget))));
		}
	}

	/**
	 * Renders a view file.
	 * This method includes the view file as a PHP script
	 * and captures the display result if required.
	 * @param string view file
	 * @param array data to be extracted and made available to the view file
	 * @param boolean whether the rendering result should be returned as a string
	 * @return string the rendering result. Null if the rendering result is not required.
	 */
	public function renderInternal($_viewFile_,$_data_=null,$_return_=false)
	{
		// we use special variable names here to avoid conflict when extracting data
		if(is_array($_data_))
			extract($_data_,EXTR_PREFIX_SAME,'data');
		else
			$data=$_data_;
		if($_return_)
		{
			ob_start();
			ob_implicit_flush(false);
			require($_viewFile_);
			return ob_get_clean();
		}
		else
			require($_viewFile_);
	}

	/**
	 * Creates a widget and initializes it.
	 * This method first creates the specified widget instance.
	 * It then configures the widget's properties with the given initial values.
	 * At the end it calls {@link CWidget::init} to initialize the widget.
	 * @param string class name (can be in path alias format)
	 * @param array initial property values
	 * @return CWidget the fully initialized widget instance.
	 */
	public function createWidget($className,$properties=array())
	{
		$className=Yii::import($className,true);
		$widget=new $className($this);
		foreach($properties as $name=>$value)
			$widget->$name=$value;
		$widget->init();
		return $widget;
	}

	/**
	 * Creates a widget and executes it.
	 * @param string the widget class name or class in dot syntax (e.g. application.widgets.MyWidget)
	 * @param array list of initial property values for the widget (Property Name => Property Value)
	 */
	public function widget($className,$properties=array())
	{
		$widget=$this->createWidget($className,$properties);
		$widget->run();
	}

	/**
	 * Creates a widget and executes it.
	 * This method is similar to {@link widget()} except that it is expecting
	 * a {@link endWidget()} call to end the execution.
	 * @param string the widget class name or class in dot syntax (e.g. application.widgets.MyWidget)
	 * @param array list of initial property values for the widget (Property Name => Property Value)
	 * @return CWidget the widget created to run
	 * @see endWidget
	 */
	public function beginWidget($className,$properties=array())
	{
		$widget=$this->createWidget($className,$properties);
		$this->_widgetStack[]=$widget;
		return $widget;
	}

	/**
	 * Ends the execution of the named widget.
	 * This method is used together with {@link beginWidget()}.
	 * @param string optional tag identifying the method call for debugging purpose.
	 * @return CWidget the widget just ended running
	 * @throws CException if an extra endWidget call is made
	 * @see beginWidget
	 */
	public function endWidget($id='')
	{
		if(($widget=array_pop($this->_widgetStack))!==null)
		{
			$widget->run();
			return $widget;
		}
		else
			throw new CException(Yii::t('yii','{controller} has an extra endWidget({id}) call in its view.',
				array('{controller}'=>get_class($this),'{id}'=>$id)));
	}

	/**
	 * Begins recording a clip.
	 * This method is a shortcut to beginning {@link CClipWidget}.
	 * @param string the clip ID.
	 * @param array initial property values for {@link CClipWidget}.
	 */
	public function beginClip($id,$properties=array())
	{
		$properties['id']=$id;
		$this->beginWidget('CClipWidget',$properties);
	}

	/**
	 * Ends recording a clip.
	 * This method is an alias to {@link endWidget}.
	 */
	public function endClip()
	{
		$this->endWidget('CClipWidget');
	}

	/**
	 * Begins fragment caching.
	 * This method will display cached content if it is availabe.
	 * If not, it will start caching and would expect a {@link endCache()}
	 * call to end the cache and save the content into cache.
	 * A typical usage of fragment caching is as follows,
	 * <pre>
	 * if($this->beginCache($id))
	 * {
	 *     // ...generate content here
	 *     $this->endCache();
	 * }
	 * </pre>
	 * @param string a unique ID identifying the fragment to be cached.
	 * @param array initial property values for {@link COutputCache}.
	 * @return boolean whether we need to generate content for caching. False if cached version is available.
	 * @see endCache
	 */
	public function beginCache($id,$properties=array())
	{
		$properties['id']=$id;
		$cache=$this->beginWidget('COutputCache',$properties);
		if($cache->getIsContentCached())
		{
			$this->endCache();
			return false;
		}
		else
			return true;
	}

	/**
	 * Ends fragment caching.
	 * This is an alias to {@link endWidget}.
	 * @see beginCache
	 */
	public function endCache()
	{
		$this->endWidget('COutputCache');
	}

	/**
	 * Begins the rendering of content that is to be decorated by the specified view.
	 * @param string the name of the view that will be used to decorate the content. The actual view script
	 * is resolved via {@link getViewFile}.
	 * @param array initial property values for {@link CContentDecorator}.
	 * @see beginContent
	 * @see CContentDecorator
	 */
	public function beginContent($view,$properties=array())
	{
		$properties['view']=$view;
		$this->beginWidget('CContentDecorator',$properties);
	}

	/**
	 * Ends the rendering of content.
	 * @see beginContent
	 */
	public function endContent()
	{
		$this->endWidget('CContentDecorator');
	}
}
