module.exports = {
  rules: [
    {
      pattern: /\/api\/gethomeStory.php\?rtype=origin$/,
      respondwith: './homeStory.json'
    },
    {
      pattern: /\/api\/gethomeStory.php\?rtype=more$/,
      respondwith: './ifyChildym.json'
    },
//  {
//    pattern: /\/api\/gethomeStory.php\?rtype=refresh$/,
//    respondwith: './ifyChildym.json'
//  },
//  {
//    pattern: /\/api\/getLiveDetail.php\?id=1$/,
//    respondwith: './detail.json'
//  },
    {
      pattern: /\/api\/gethomeStoryContent.php\?id=\d+$/,
      respondwith: './homeStoryContent.json'
    }
  ]
};
