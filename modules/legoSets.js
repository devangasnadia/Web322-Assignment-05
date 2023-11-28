const setData = require("../data/setData");
const themeData = require("../data/themeData");
let sets = [];

function initialize() {
  return new Promise(async (resolve, reject) => {
    try {
      sets = setData.map((set) => ({
        ...set,
        theme: themeData.find((theme) => theme.id === set.theme_id).name,
      }));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function getAllSets() {
  return new Promise((resolve, reject) => {
    if (sets.length > 0) {
      resolve(sets);
    } else {
      reject("Sets not found.");
    }
  });
}

function getSetByNum(setNumber) {
  return new Promise((resolve, reject) => {
    const set = sets.find((s) => s.set_num === setNumber);
    if (set) {
      resolve(set);
    } else {
      reject("Requested set not found by getSetByNum().");
    }
  });
}

function getSetsByTheme(setTheme) {
  return new Promise((resolve, reject) => {
    const themesLowercase = setTheme.toLowerCase();
    const matchSets = sets.filter((set) =>
      set.setTheme.toLowerCase().includes(themesLowercase)
    );
    if (matchSets.length > 0) {
      resolve(matchSets);
    } else {
      reject("Requested sets not found by getSetsByTheme().");
    }
  });
}
 
function addSet(setData) {
  return new Promise((resolve, reject) => {
    Set.create({
      set_num: setData.set_num,
      name: setData.name,
      year: setData.year,
      num_parts: setData.num_parts,
      theme_id: setData.theme_id,
      img_url: setData.img_url,
    }).then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err.errors[0].message);
      });
  });
}

function getAllThemes() {
  return new Promise((resolve, reject) => {
    Theme.findAll({})
      .then((themes) => {
        resolve(themes);
      })
      .catch((err) => {
        reject(err.message);
      })
  })
}

function editSet(setNum, setData) {
  return new Promise((resolve, reject) => {
    Set.update({
      set_num: setData.set_num,
      name: setData.name,
      year: setData.year,
      num_parts: setData.num_parts,
      theme_id: setData.theme_id,
      img_url: setData.img_url,
    }, {
      where: {set_num: setNum}
    }).then(() => {
      resolve();
    }).catch((err) => {
      reject(err.errors[0].message);
    });
  });
}

function deleteSet(setNum) {
  return new Promise((resolve, reject) => {
    Set.destroy({
      where: {set_num: setNum}
    }).then(() => {
      resolve();
    }).catch((err) => {
      reject(err.errors[0].message);
    });
  });
} 

module.exports = 
{ 
  initialize, 
  getAllSets, 
  getSetByNum, 
  getSetsByTheme, 
  addSet, 
  getAllThemes, 
  editSet, 
  deleteSet 
}
