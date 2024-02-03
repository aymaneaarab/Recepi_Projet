import styles from "./Loader.module.css";
const { useState } = require("react");

const withLoaderHOC = (WrappedComponent)=>{
    return (props)=>{
        const [loading,setloading]=useState(true);
        setTimeout(() => {
            setloading(false)
        }, 5000);
        return (
            <div>
                {loading ? <Loader/> : <WrappedComponent {...props}/>}
            </div>
        )
    }
}
export default withLoaderHOC;

function Loader (){
    return (
        <div className="flex">

            <div className={styles.loader}></div>
           
        </div>

    )
}