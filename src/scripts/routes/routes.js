import AllRestoData from '../views/pages/all-data';
import Detail from '../views/pages/detail';
import Like from '../views/pages/like';

const routes = {
  '/': AllRestoData, // default page
  '/home': AllRestoData,
  '/detail/:id': Detail,
  '/favourite': Like,
};

export default routes;