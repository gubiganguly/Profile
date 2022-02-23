const express = require("express")
const router = express.Router()
const axios = require("axios")
const Profile = require('../models/profile')


// get all profiles (for searchbar)
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find()  
        res.json(profiles)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// get profile by account
router.get('/:account', getByAddress, async (req, res) => {
    try { 
        res.json(res.profile)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// get profile by name
router.get('/:name', getByName, async (req, res) => {
    try { 
        res.json(res.profile)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// create profile
router.post('/', async (req, res) => {
    const profile = new Profile({
        account: req.body.account,
        profileImage: req.body.profileImage,
        name: req.body.name,
        profileDescript: req.body.profileDescript,
        posts: "no posts",
        products: "no products"
    })

    try {
        const newProfile = await profile.save() // save new profile to
        res.status(201).json(newProfile)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// update profile based on given data
router.patch('/:account', getByAddress, async (req, res) => {
    if (req.body.profileImage != null) {
        res.profile.profileImage = req.body.profileImage
    }
    if (req.body.name != null) {
        res.profile.name = req.body.name
    }
    if (req.body.profileDescript != null) {
        res.profile.profileDescript = req.body.profileDescript
    }
    if (req.body.posts != null) {
        res.profile.posts = req.body.posts
    }
    if (req.body.products != null) {
        res.profile.products = req.body.products
    }

    try {
        const updatedProfile = await res.profile.save()
        res.json(updatedProfile)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// delete profile
router.delete('/:account', getByAddress, async (req, res) => {
    try {
        await res.profile.remove()
        res.json({ message: 'Deleted Profile'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// MIDDLEWEAR

// get profile from account
async function getByAddress(req, res, next) {
    let profile = null
    try {
        // gets all profiles with req.params.account
        profile = await Profile.find({account: req.params.account}).clone()
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
    res.profile = profile[0]

    if (res.profile == undefined) {
        return res.status(404).json({message: "Can't find account"})
    }
    next()
}

// get profile from account
async function getByName(req, res, next) {
    let profile = null
    try {
        // gets all profiles with req.params.name
        profile = await Profile.find({name: req.params.name}).clone()
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
    res.profile = profile[0]

    if (res.profile == undefined) {
        return res.status(404).json({message: "Can't find account"})
    }
    next()
}


// get NFTs from openSea




module.exports = router