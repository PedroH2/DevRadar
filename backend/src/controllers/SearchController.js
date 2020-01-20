const Dev = require ('../models/Dev');
const parseStringAsArray = require ('../utils/parseStringAsArray')

module.exports = {
  async index(request, response){
    const { latitude, longitude, techs } = request.query;
    //buscar todos os devs num raio de d10km
    //filtrar por tech

    const techsArray = parseStringAsArray(techs);
    
    const devs = await Dev.find({//procuro os devs e filto por geometria de latitude e longitude e pela distancia de 10km
      techs: {
        $in: techsArray,
      },
      location: {
       $near:{
         $geometry:{
           type: 'Point',
           coordinates: [longitude, latitude]
         },
         $maxDistance: 10000,
       },
      }
    })

    console.log(techsArray);
    return response.json ({devs})
  }
}