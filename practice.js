exports.getProductsBySearch = async (req, res, next) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};
  // filters: { category: [], price: [] }
  for (let key in req.body.filters) {
    // key 는 category,
    // price 즉 for문이 key값만큼 (category, price) 2번 도는 것
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        // gte - greater than price [0 - 10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        //category 부분을 복사 붙혀넣기 하는 것 !
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  //try catch

  try {
    const products = await Product.find(findArgs)
      .populate('category')
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec();
    res.json({
      size: products.length,
      data: products,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
};
