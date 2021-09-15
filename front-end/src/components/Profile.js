import Coins from "./Coins";

const Profile = (props)=>{
  console.log(props);
    return (
      <>
        <h1>Profile</h1>
        <h3> Welcome {`${props.user.name}`}</h3>
        <h3> your balance: {`${props.user.balance}`}</h3>

        <Coins {...props} />
      </>
    )
  }
  export default Profile;
  
