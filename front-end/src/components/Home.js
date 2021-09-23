import News from "./News/News";

const Home = (props)=>{
  console.log(props);
  const {history,location,match} = props;
  return (
    <>
      <h1>Home</h1>      
      <ul>
      <br></br>
      <h3>props:</h3>
        {
          Object.keys(props).map((item,i)=>{
            return (
                <li key={i}>{`${item}: ${JSON.stringify(props[item])}`}</li>
              )
          })
        }
      </ul>    
      {console.log(props)}


      
    </>
  )
}
export default Home;
