const express = require('express');

const MemberRecords = require('./memberRecords-model')

const router = express.Router();

router.get('/', (req, res) => {
    MemberRecords.find()
    .then(MemberRecords => {
        res.json(MemberRecords);
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed to get member record' });
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    MemberRecords.findById(id)
    .then(MemberRecords => {

        if(MemberRecords) {
            res.json(MemberRecords);
        } else {
            res.status(404).json({ message: 'Could not find record status with given id.' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get member record' })
    });
});

router.post('/', (req, res) => {
    const memberRecordData = req.body;

    MemberRecords.add(memberRecordData)
    .then(newRecord => {
        res.status(201).json(newRecord);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to create new member record' })
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    MemberRecords.update(id, changes)
    .then(MemberRecords => {
        if (MemberRecords) {
            res.json({ update: MemberRecords });
        } else {
            res.status(404).json({ message: 'Could not find record with given id' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to update record' })
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    MemberRecords.remove(id)
    .then(count => {
        if (count) {
            res.json({ removed: count });
        } else {
            res.status(404).json({ message: 'Could not find member record with given id'})
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to delete member record' })
    })
})