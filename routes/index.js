exports.index = function(req,res){
  res.render('index', { title: 'Lighting Control' });
};

exports.page = function(req,res){
  res.render('page', { 
  	title: 'Lighting Control',
  	body: 'body lo'
  });
};