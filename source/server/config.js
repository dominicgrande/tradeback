module.exports = {
  mongo_connection: process.env.MONGO_URL || 'mongodb://admin:httpsonly@ds019471.mlab.com:19471/cs498-final-project',
  port: process.env.PORT || 3000,
};