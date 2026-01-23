import { http, HttpResponse } from 'msw';
import DefaultUsers from './data/users.json';

const baseApiURL = 'https://fruitproducts.org/api/v1';

const users = DefaultUsers;

export const handleLoginUser = http.post(`${baseApiURL}/user`, async (req) => {
    const userData = await req.request.clone().json();
    
    const isExistsUser = users.find((user) => user.email.toLowerCase() === userData.emailUser.toLowerCase());

    if (!isExistsUser || isExistsUser.password !== userData.passwordUser) {
        return HttpResponse.json({
                message: 'Invalid user',
            }, { status: 401 });
    } else {

        await new Promise((r) => setTimeout(r, 2000)); // DELETE

        return HttpResponse.json(isExistsUser, { status: 201 });
    }
});