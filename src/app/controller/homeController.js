const Movie = require('../model/movies')
const PAGE_SIZE = 8;
class homeControllers{
    index(req,res){

        const moviePhimLe = Movie.find({case:"pl"}).limit(PAGE_SIZE).sort({createdAt:-1})
        const moviePhimBo = Movie.find({case:"pb"}).limit(PAGE_SIZE).sort({createdAt:-1})
       const movieNew = Movie.find().limit(PAGE_SIZE).sort({createdAt:-1})
        Promise.all([movieNew,moviePhimLe,moviePhimBo])
        .then(data =>{
            const newMovie=data[0];
            const odlMovie=data[1];
            const episodeMovie=data[2];
            const dataphimmoi = newMovie.map(function(ele){return ele.toObject()});
            const dataphile = odlMovie.map(function(ele){return ele.toObject()});
            const dataphimbo = episodeMovie.map(function(ele){return ele.toObject()});
            //res.json(dataphimmoi)
            res.render('home',{data:dataphimmoi,dataphimle:dataphile,dataphimbo:dataphimbo}); //0 là phim mới -- 1 là phim lẻ -- 2 là phim bộ
        })
        
        
    }
    test(req,res){
        res.send('123');
    }
   
}

module.exports = new homeControllers;