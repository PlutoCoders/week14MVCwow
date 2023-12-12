// Currently, this small helper function does not need to have its own file as a util file, but if we add more helpers, we can put them there.

// This is the better practice, to seperate code into an organized structure to avoid large jumbled messes of code

// This helper function will be used in the homeroutes and where we have the blog post date information
module.exports = {
  format_date: date => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
};
