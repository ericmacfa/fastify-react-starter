import Cookies from 'js-cookie';

export const getUserInfo = () => {
    try {
        const userInfo = Cookies.getJSON('userInfo');

        return userInfo;
    } catch (error) {
        console.log(error);

        return null;
    }
};
