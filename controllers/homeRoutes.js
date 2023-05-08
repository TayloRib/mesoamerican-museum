const router = require('express').Router();
const { Museum, Civ, ArtType, ArtWork, User } = require('../models')

router.get('/', async (req, res) => {
  
    res.render('index', {layout:false});
  });

  router.get('/catalog/', async (req, res) => {
    try{
      const dbArtbyType = await Civ.findByPk(1,{
        include:[
          {
            model:ArtType,
            attributes:['name'],
            include:[
              {
                model:ArtWork,
                attributes:['id','name','image_url']
              }
            ]
          }
        ]
      })
    
      const civs = dbArtbyType.get({plain:true})
      console.log(civs)
      console.log(civs.art_types[0].artworks)
      res.render('catalog', {layout:false,civs})
    }catch(err){
      console.log(err)
      res.status(500).json(err)
    }
  });

  router.get('/civart', async (req, res) => {
  
    res.render('civart', {layout:false});
  });

  router.get('/singleart', async (req, res) => {
  
    res.render('singleart', {layout:false});
  });

  router.get('/updateitem', async (req, res) => {
  
    res.render('updateitem', {layout:false});
  });
  router.get('/deleteitem', async (req, res) => {
  
    res.render('deleteitem', {layout:false});
  });
  router.get('/usercollection', async (req, res) => {
  
    res.render('usercollection', {layout:false});
  });
  router.get('/additem', async (req, res) => {
  
    res.render('additem', {layout:false});
  });
  router.get('/olmec', async (req, res) => {
  
    res.render('olmec', {layout:false});
  });
  router.get('/maya', async (req, res) => {
  
    res.render('maya', {layout:false});
  });
  router.get('/inca', async (req, res) => {
  
    res.render('inca', {layout:false});
  });
  router.get('/aztec', async (req, res) => {
  
    res.render('aztec', {layout:false});
  });
  router.get('/catalogoptions', async (req, res) => {
  
    res.render('catalogoptions', {layout:false});
  });








module.exports = router;