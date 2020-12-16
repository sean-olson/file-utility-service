const helpers = {
    parseRecord: (body) => {
        const map = new Map();
        for(let prop in body){
            map.set(prop.toLowerCase(), body[prop]);
        }
        const person = [];
        person.push(map.has('lastname') ? map.get('lastname') : 'Rogers');
        person.push(map.has('firstname')  ? map.get('firstname') : 'Will');
        person.push(map.has('gender')  ? map.get('gender') : 'male');
        person.push(map.has('favoritecolor')  ? map.get('favoritecolor') : 'Red');
        person.push(map.has('dateofbirth') && Date.parse(map.get('dateofbirth')) ? map.get('dateofbirth') : '11/4/1879');

        return person;
    }
}

exports.helpers = helpers;