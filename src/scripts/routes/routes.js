import AllRestoData from '../views/pages/all-data';
import Detail from '../views/pages/detail';

const routes = {
  '/': AllRestoData, // default page
  '/home': AllRestoData,
  '/detail/:id': Detail,
};

export default routes;