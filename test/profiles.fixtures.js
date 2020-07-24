function makeProfileArray() {
    return [
      {
        id: 1,
        userid: 1,
        gamemaster: false, 
        genre: 'fantasy', 
        romance: true, 
        frequency: 'Bi-Weekly',
        duration: 'Short 2 to 3 Hours', 
        alignment: 'Good', 
        groupsize: 5, 
        pvp: true, 
        experience: 2, 
        gmexp: true, 
        playexp: true
      },
      {
        id: 2,
        userid: 3,
        gamemaster: false, 
        genre: 'sci-fi', 
        romance: false, 
        frequency: 'Bi-Weekly',
        duration: 'Short 2 to 3 Hours', 
        alignment: 'Evil', 
        groupsize: 4, 
        pvp: true, 
        experience: 3, 
        gmexp: false, 
        playexp: true
      },
      {
        id: 3,
        userid: 6,
        gamemaster: false, 
        genre: 'fantasy', 
        romance: true, 
        frequency: 'Weekly',
        duration: 'Long 5+ Hours', 
        alignment: 'Good', 
        groupsize: 3, 
        pvp: true, 
        experience: 1, 
        gmexp: true, 
        playexp: true
      }
    ];
  }

  function makeProfileRes() {
    const testProfileRes = makeProfileArray()
    return testProfileRes
  }
  
  function randomProfile() {
    const index = Math.floor(Math.random() * makeProfileRes().length);
    return makeProfileRes()[index];
  }
  
  module.exports = {
    makeProfileArray,
    randomProfile,
    makeProfileRes
  };