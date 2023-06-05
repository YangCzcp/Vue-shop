// profile: state => {
//     return state.User.profile
// }

const profile =(state)=>{return state.profile.username}
const role = (state)=>{return state.profile.role_id};

export default{
    profile,
    role
}