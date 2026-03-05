const isSubstringAt = (str1, str2, i) => {
  for (let index = 0; index < str2.length; index++) {
    if (str2[index] !== str1[index + i]) return false;
  }

  return true;
};

const isSubstring = (str1, str2) => {
  for (let index = 0; index < str1.length; index++) {
    if (isSubstringAt(str1, str2, index)) return true;
  }

  return false;
};
