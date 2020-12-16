const helpers = {
    getRoutes: (app) => {
        const routes = [];
        app._router.stack.forEach(el => {
          if (el.route !== undefined && el.route.stack[0].method.toLowerCase() === 'get') {
            routes.push({
              path: el.route.path,
              method: el.route.stack[0].method,
              params: el.route.stack[0].params
            });
          }
        });
        routes.sort((a, b) => {
          if (a.path !== b.path) {
            return a.path > b.path;
          } else {
            return a.method > b.method;
          }
        });
        return routes;
      }
}

exports.helpers = helpers;