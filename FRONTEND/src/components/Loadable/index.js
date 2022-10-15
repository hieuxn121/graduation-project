import Loadable from 'react-loadable'
import Loading from '../Loading/index'

const LoadableComponet = (component) => 
    Loadable({
        loader: component,
        loading: Loading
    })
export default LoadableComponet;