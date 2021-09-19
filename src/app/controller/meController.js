const Movie = require('../model/movies')
const PAGE_SIZE = 8;
class meControllers{
    index(req,res){
        res.render('profile')
    }
    addmovie(req,res){
        res.render('addmovie')
    }
    changemovie(req,res){
        Movie.findById(req.params.id)
        .lean()
        .then(data=>{
            res.render('changemovie',{data:data});
        })
       
    }
    watchmovie(req,res){
       
        const slug = req.params.name;
        Movie.findOne({slug:slug})
        .lean()
        .then(data=>{
          
         
            res.render('watchmovie',{data:data});
        })
   
    }
    watchmoviepb(req,res){
        const slug = req.params.name;
        const tap =req.params.tap;
      
     
          Movie.findOne({slug:slug})
         .lean()
         .then(data=>{
            const ep = Number(tap) - 1;
            var video;
            var srcVideo;
            
            try {
                video = data.listEpisode[ep];
            } catch (error) {
                video = "";
            }
            try {
                srcVideo = data.srcEpisode[ep];
            } catch (error) {
                srcVideo = "";
            }
            Movie.find()
            .lean()
            .then(listdata=>{
                var myType = data.type;
                var datahoathinh = [];
                var mangCoTheBanXem= [];
                myType.forEach(element=>{
                    const a = listdata.filter(function(elem){
                        const mangType =elem.type;
                        
                        return mangType.includes(element) ? elem : "";
                    })
                    datahoathinh.push(a);
                })
                var myView = data.views +1;
                Movie.updateOne({slug:slug},{$set: { views: myView}})
                .lean()
                .then(()=>redirect('back'))
                mangCoTheBanXem = themMangKhongTrungLap(datahoathinh);
                var mangCoTheBanXemWithOutSelf = removeElementData(mangCoTheBanXem,data);
                const mangCoTheBanXemlimit = mangCoTheBanXemWithOutSelf.slice(0,PAGE_SIZE);
              res.render('watchmovie',{videoinfo:video,data:data,ep:tap,srcvideo:srcVideo,dataBanMuonXem:mangCoTheBanXemlimit});
            })           
        })
   
    }
    upload(req,res){
       
        const name = req.body.name;
        const convertNamelow = name.toLowerCase();
        const convertCountrylow = req.body.country.toLowerCase();
        var okiframe =[];
        var srcvideo =[];
        if(req.body.sourceVideo==='okiframe'){
            if(req.body.case==='pb'){
                okiframe = req.body.listvideo
            }
            else{
                okiframe = req.body.video;
            }
        }
        if(req.body.sourceVideo==='srcvideo'){
            if(req.body.case==='pb'){
                srcvideo = req.body.listvideo;
            }
            else{
                srcvideo = req.body.video;
            }
        }
        const newMovie = new Movie({
            name:convertNamelow,
            description:req.body.description,
            image:req.body.image,
            case:req.body.case,
            type:req.body.typeMovie,
            timePlay:req.body.timePlay,
            episode: req.body.episode,
            episodeRelease: req.body.episodeRelease,
            country:convertCountrylow,
            mark:req.body.mark,
            trailer:req.body.trailer,
            listEpisode:okiframe,
            srcEpisode:srcvideo,
        })
        newMovie.save(function(err){
            if(err)
            {
                res.send(err)
            }else{
                res.redirect('/');
            }
        })
        
    }
    listmovie(req,res){
        Movie.find()
        .lean()
        .then(data=>{
            res.render('listmovie',{data:data});
        })
        
    }
    deletemovie(req,res){
        Movie.findByIdAndDelete(req.params.id)
        .lean()
        .then(data=>{
            res.redirect('back');
        })
    }
    infoMovie(req,res){
        const slug = req.params.slug;
        Movie.findOne({slug:slug})
        .lean()
        .then(data=>{
            Movie.find()
            .lean()
            .then(listdata=>{
                var myType = data.type;
                var datahoathinh = [];
                var mangCoTheBanXem= [];
                myType.forEach(element=>{
                    const a = listdata.filter(function(elem){
                        const mangType =elem.type;
                        
                        return mangType.includes(element) ? elem : "";
                    })
                    datahoathinh.push(a);
                })
                mangCoTheBanXem = themMangKhongTrungLap(datahoathinh);
                var mangCoTheBanXemWithOutSelf = removeElementData(mangCoTheBanXem,data);
                const mangCoTheBanXemlimit = mangCoTheBanXemWithOutSelf.slice(0,PAGE_SIZE);
                 res.render('infoMovie',{data:data,dataBanMuonXem:mangCoTheBanXemlimit});
            })
           
           
        })
       
    }
    search(req,res){
       const finding = req.query.q.trim();
       const remakefind = finding.toLowerCase(); 
        
        Movie.find()
        .lean()
        .then(data=>{
            
            var datafind = data.filter(function(element){
                var convertSlug = element.slug.replace(/-/g," ");
          
                return convertSlug.includes(remakefind);
            })
            var datafindCoDau = data.filter(function(element){
                return element.name.includes(remakefind);
            })
            
            const dataTong = datafind.concat(datafindCoDau);
           //  res.json(dataTong);
            res.render('search',{data:dataTong})
        })
    }
}


function themMangKhongTrungLap(MangCanTach){
    mangDaCo =[];
    MangCanTach.forEach(elem=>{
        var mangMoi = elem.filter(function(element){
            return !JSON.stringify(mangDaCo).includes(JSON.stringify(element));
        })
        mangDaCo = mangDaCo.concat(mangMoi);
    })
    return mangDaCo;
}
function removeElementData(mangHientai,data){
    
    return mangHientai.filter(function(element){
        return JSON.stringify(element) !== JSON.stringify(data);
    })
   
}

function convertTypeToString(Array){
    
}

module.exports = new meControllers;