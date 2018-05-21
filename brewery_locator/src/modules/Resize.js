let props={
	windowWidth: 0,
	windowHeight: 0
};
import comm from './AJAX.js';
export default{
		windowWidth: 0,
		windowHeight: 0,
		getWindowWidth:(event)=>{
				this.windowWidth = document.documentElement.clientWidth;
			return this.windowWidth;
		},
		getWindowHeight:(event)=>{
				this.windowHeight = document.documentElement.clientHeight;
			return this.windowHeight;
		},
		setListener:()=>{
		    window.addEventListener('resize', () => {
		     comm.comm.$emit('event_resize', {width: this.a.getWindowWidth(), height: this.a.getWindowHeight()});
		    });			
		}
 }