
import noImage from '../assets/img/default/no-image.png';
import { http, HttpResponse } from 'msw';

export const handlerNoImage = 
  http.get("https://images.example.com/*", () => {
    return HttpResponse.redirect(noImage);
  });