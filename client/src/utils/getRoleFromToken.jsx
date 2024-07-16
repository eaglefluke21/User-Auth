import {jwtDecode} from 'jwt-decode';

const getRoleFromToken = () => {
const token = sessionStorage.getItem('jwToken');
if (!token) return 'guest';

try {
    const decoded = jwtDecode(token);
    console.log('check for decoded:', decoded);
    console.log('check for decoded token:', decoded.user.role);
    return decoded.user.role;
   

} catch(error) {
    console.error('Invalid token:',error);
    return null;
}
};

export default getRoleFromToken;