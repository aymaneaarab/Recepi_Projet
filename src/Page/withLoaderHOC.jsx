const { Layout } = require("antd");
const { useState } = require("react")

const withLoaderHOC = (wrappedComponent)=>{
    return (props)=>{
        const [loading,setloading]=useState(true);
        setTimeout(() => {
            setloading(false)
        }, 3000);
        return (
            <div>
                {loading ? <p>Loading ...</p> : <Layout/>}
            </div>
        )
    }
}
export default withLoaderHOC;