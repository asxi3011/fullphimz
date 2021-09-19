const Movie = require('../model/movies')
const PAGE_SIZE = 8;
class homeControllers{
   
    movieType(req,res){
        
        const type =req.params.theloai;
        switch(type) {
            case 'phimle':
                Movie.find({case:'pl'})
                .sort({createdAt:-1})
                .lean()
                .then(data=>{
                    res.render('category',{data:data,title:"Phim Lẻ"})
                })
              break;
              case 'phimmoi':
                Movie.find()
                .sort({createdAt:-1})
                .lean()
                .then(data=>{
                    res.render('category',{data:data,title:"Phim Mới"})
                })
              break;
            case 'phimbo':
                Movie.find({case:'pb'})
                .sort({createdAt:-1})
                .lean()
                .then(data=>{
                    res.render('category',{data:data,title:"Phim Bộ"})
                })
              break;
              case 'phimhoathinh':
                Movie.find()
                .sort({createdAt:-1})
                .lean()
                .then(data=>{
                    var datahoathinh = [];
                    data.forEach(element=>{
                        var arrayType = element.type;
                        if(arrayType.includes("hoạt hình")){   // số 1 là phim hoạt hình
                            
                            datahoathinh.push(element);
                        }
                       
                    })
                    res.render('category',{data:datahoathinh,title:"Phim Hoạt Hình"})
                })
              break;
                case 'phimchieurap':
                    Movie.find()
                    .sort({createdAt:-1})
                    .lean()
                    .then(data=>{
                        var datahoathinh = [];
                        data.forEach(element=>{
                            var arrayType = element.type;
                            if(arrayType.includes("chiếu rạp")){   // số 2 là phim chiếu rạp
                                datahoathinh.push(element);
                            }
                           
                        })
                        res.render('category',{data:datahoathinh,title:"Phim Chiếu Rạp"})
                    })
                  break;
            default:
              res.redirect('back');
          }
    }
   
}

module.exports = new homeControllers;