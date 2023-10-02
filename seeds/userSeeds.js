const {User} = require('../models');

const userData = [
    {
        username: "xX_CodingisAwesome_Xx",
        password: "CoDeRs_4_Lyfe",
    },
    {
        username: "l33t_c0d3r",
        password: "1Am50C007",
    },
    {
        username: "ComputersR0ck",
        password: "101010Wow!",
    },
  ];
  
  const userInfo = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
  module.exports = userInfo;