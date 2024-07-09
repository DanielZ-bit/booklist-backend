const notFound = (req,res) => {
    res.status(400).send("route does not exist");
}

module.exports = notFound;