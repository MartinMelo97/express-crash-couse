const express = require('express')
const router = express.Router()
const members = require('../../Members')
const uuid = require('uuid')

//Get All Members
router.get('/', (req, res) =>
    res.json(members)
)

// Get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ message: `Not member with id ${req.params.id}` })
    }
})

//Create member
router.post('/', (req, res) => {
    // members.push(req.body)
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ message: 'Please include a name and email'})
    }

    members.push(newMember)
    res.status(200).json(members)

})

//Update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {
        const updMember = req.body
        if(!updMember.name || !updMember.email) {
            return res.status(400).json({ message: 'Please include a name and email' })
        }
        console.log("entro")
        memberToUpdate = members.find((member)=> member.id === parseInt(req.params.id))
        memberToUpdate.name = updMember.name
        memberToUpdate.email = updMember.email

        res.status(200).json({ member: memberToUpdate, message: 'OK' })
    } else {
        res.status(400).json({ message: `Not member with id ${req.params.id}` })
    }
})

// Delete member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {
        res.json({
            msg: `Member deleted with id ${req.params.id}`,
            members: members.filter(member => member.id !== parseInt(req.params.id))
        })
    } else {
        res.status(400).json({ message: `Not member with id ${req.params.id}` })
    }
})

module.exports = router