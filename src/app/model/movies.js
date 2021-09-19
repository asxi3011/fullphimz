const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const course = new Schema({
    name: {type:String,maxLength:255},
    video: {type:String },
    image:{type:String },
    slug:{type:String,slug:'name',unique:true},
    case:{type:String},
    type:[String], 
    /*1: Phim hoạt hình
    2: Phim chiếu rạp
    3: Phim kinh dị
    4: Phim tình cảm
    5: Phim trinh thám
    6: Phim hài hước
    */
    
    country:{type:String},
    description:{type:String},
    trailer:{type:String},
    mark:{type:String},
    timePlay:{type:String},
    episode: {type:String,default:"1"},
    episodeRelease: {type:String},
    views: {type: Number,default: 0},
    trailer:{type:String},
    listEpisode:{type:Array},
    srcEpisode:{type:Array},
  
},{
    timestamps:true,
})

module.exports = mongoose.model('movies',course);