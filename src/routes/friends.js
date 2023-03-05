const User = require("../services/modules/User")
const OMG = require("../services/xmpp")
class Friends {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }
    endpoints(application) {
        application.get("/api/v1/search/:id", async (req, res) => {
            var Accounts = User.find({ displayName: { $regex: req.params.id, $options: 'i' } }).lean()

            if (!Accounts) {
                res.json([])
            } else {
                if (req.query.prefix != undefined) {
                    var Accounts2 = await User.find({ displayName: { $regex: req.query.prefix, $options: 'i' } }).lean()

                    if (Account2) {
                        var Data = []
                        for (const index of Account2) {
                            Data.push({
                                "accountId": index["id"],
                                "matches": [{
                                    "value": index["displayName"],
                                    "platform": "epic"
                                }],
                                "matchType": "prefix",
                                "epicMutuals": 0,
                                "sortPosition": 1
                            })
                        }
                        res.json(Data)
                    } else {
                        res.json([])
                    }
                } else {
                    var Data = []
                    for (const index of Accounts) {
                        Data.push({
                            "accountId": index["id"],
                            "matches": [{
                                "value": index["displayName"],
                                "platform": "epic"
                            }],
                            "matchType": "prefix",
                            "epicMutuals": 0,
                            "sortPosition": 1
                        })
                    }
                    res.json(Data)
                }
            }
        })


        application.all("/friends/api/v1/:accountId:/summary", async (req, res) => {
            var friends = await User.findOne({ id: req.params.accountId }).lean().catch(e => next(e))
            // console.log(friends["Friends"]["incoming"])
            if (friends) {
                var incoming = []
                for (const index of friends["Friends"]["incoming"]) {
                //    console.log(index)
                    incoming.push({
                        accountId: index.id,
                        mutual: 0,
                        favorite: false,
                        created: index.createdAt
                    })
                }
                var outgoing = []
                for (const index of friends["Friends"]["outgoing"]) {
                  //  console.log(index)
                    outgoing.push({
                        accountId: index.id,
                        mutual: 0,
                        favorite: false,
                        created: index.createdAt
                    })
                }
                var accepted = []
                for (const index of friends["Friends"]["accepted"]) {
                    //console.log(index)
                    accepted.push({
                        accountId: index.id,
                        groups: [],
                        mutual: 0,
                        alias: "",
                        note: "",
                        favorite: false,
                        created: index.createdAt
                    })
                }
                res.json({
                    friends: accepted,
                    incoming: incoming,
                    outgoing: outgoing,
                    suggested: [{
                        "accountId": "b197bb1cf8e71dda62c746396037769c",
                        "mutual": 0
                    }],
                    blocklist: [],
                    settings: {
                        acceptInvites: "public"
                    }
                })
            } else {
                res.json({
                    friends: [],
                    incoming: [],
                    outgoing: [],
                    suggested: [],
                    blocklist: [],
                    settings: {
                        acceptInvites: "public"
                    }
                })
            }
        })


        application.get("/account/api/public/account/displayName/:displayName", async (req, res) => {
            var friends = await User.findOne({ displayName: { $regex: req.params.displayName, $options: 'i' } }).lean()
            if (friends) {
                res.json({
                    id: friends.id,
                    displayName: friends.displayName,
                    externalAuths: {}
                });
            } else {
                res.json({
                    errorCode: "errors.com.epicgames.ded.friend",
                    message: "Bro has some iq"
                })
            }
        })

        application.all('/friends/api/v1/:accountId/settings', (req, res) => {
            res.json({
                acceptInvites: "public"
            })
        });


        application.all("/friends/api/public/friends/:accountId/:friendId", async (req, res) => {
            var friends = await User.findOne({ id: req.params.accountId }).lean().catch(e => next(e))

            if (friends) {
                if (req.method == "GET") {
                    if (friends.Friends.accepted.find(x => x.id == req.params.friendId) != undefined) {
                        res.json({
                            accountId: req.params.friendId,
                            groups: [],
                            mutual: 0,
                            alias: "",
                            note: "",
                            favorite: false,
                            created: friends.Friends.accepted.find(x => x.id == req.params.friendId).createdAt
                        })
                    } else {
                        res.status(404).json(
                            "errors.com.epicgames.friends.friendship_not_found", 14004,
                            `Friendship between ${req.params.accountId} and ${req.params.friendId} does not exist`,
                            "friends", "prod", [req.params.accountId, req.params.friendId]
                        )
                    }
                } else if (req.method == "POST") {

                    if (friends.Friends.accepted.find(x => x.id == req.params.friendId) != undefined) {
                        res.status(409).json(
                            "errors.com.epicgames.friends.friend_request_already_sent", 14014,
                            `Friendship between ${req.params.accountId} and ${req.params.friendId} already exists.`,
                            "friends", "prod", [req.params.friendId]
                        )
                    } else if (friends.Friends.outgoing.find(x => x.id == req.params.friendId) != undefined) {
                        res.status(409).json(
                            "errors.com.epicgames.friends.friend_request_already_sent", 14014,
                            `Friendship request has already been sent to ${req.params.friendId}`,
                            "friends", "prod", [req.params.friendId]
                        )
                    } else if (friends.Friends.incoming.find(x => x.id == req.params.friendId) != undefined) {
                        //console.log("E")
                        await User.updateOne({ id: req.params.accountId }, { $pull: { ['Friends.incoming']: { id: req.params.friendId } }, $push: { ['Friends.accepted']: { id: req.params.friendId, createdAt: new Date() } } })
                        await User.updateOne({ id: req.params.friendId }, { $pull: { ['Friends.outgoing']: { id: req.params.accountId } }, $push: { ['Friends.accepted']: { id: req.params.accountId, createdAt: new Date() } } })
                        res.status(204).end()
                    } else {
                     //   console.log("A")
                        await User.updateOne({ id: req.params.accountId }, { $push: { ['Friends.outgoing']: { id: req.params.friendId, createdAt: new Date() } } })
                        await User.updateOne({ id: req.params.friendId }, { $push: { ['Friends.incoming']: { id: req.params.accountId, createdAt: new Date() } } })
                        res.status(204).end()
                    }
                }
            } else if (req.method == "DELETE") {

                if (friends.Friends.accepted.find(x => x.id == req.params.friendId) != undefined) {
                    await User.updateOne({ id: req.params.accountId }, { $pull: { ['Friends.accepted']: { id: req.params.friendId } } })
                    await User.updateOne({ id: req.params.friendId }, { $pull: { ['Friends.accepted']: { id: req.params.accountId } } })

                    res.status(204).end()
                } else if (friends.Friends.outgoing.find(x => x.id == req.params.friendId) != undefined) {
                    await User.updateOne({ id: req.params.accountId }, { $pull: { ['Friends.outgoing']: { id: req.params.friendId } } })
                    await User.updateOne({ id: req.params.friendId }, { $pull: { ['Friends.incoming']: { id: req.params.accountId } } })

                    res.status(204).end()

                } else if (friends.Friends.incoming.find(x => x.id == req.params.friendId) != undefined) {
                    await User.updateOne({ id: req.params.accountId }, { $pull: { ['Friends.incoming']: { id: req.params.friendId } } })
                    await User.updateOne({ id: req.params.friendId }, { $pull: { ['Friends.outgoing']: { id: req.params.accountId } } })

                    res.status(204).end()
                } else {
                    res.status(404).json(errors.create(
                        "errors.com.epicgames.friends.friendship_not_found", 14004,
                        `Friendship between ${req.params.accountId} and ${req.params.friendId} does not exist`,
                        "friends", "prod", [req.params.accountId, req.params.friendId]
                    ))
                }

            } else {
                // if this gets called then something went really wrong :skull: turns in to PUT request 
            }
        })

        application.all("/friends/api/v1/:accountId/friends/:friendId", async (req, res) => {
            var friends = await User.findOne({ id: req.params.accountId }).lean().catch(e => next(e))

            if (!friends) return res.status(404).json(
                "errors.com.epicgames.account.account_not_found", 18007,
                `Sorry, we couldn't find an account for ${req.params.accountId}`,
                "friends", "prod"
            )

            if (req.method == "GET") {

                if (friends.Friends.accepted.find(x => x.id == req.params.friendId) != undefined) {
                    res.json({
                        accountId: req.params.friendId,
                        groups: [],
                        mutual: 0,
                        alias: "",
                        note: "",
                        favorite: false,
                        created: friends.Friends.accepted.find(x => x.id == req.params.friendId).createdAt
                    })
                } else {
                    res.status(404).json(
                        "errors.com.epicgames.friends.friendship_not_found", 14004,
                        `Friendship between ${req.params.accountId} and ${req.params.friendId} does not exist`,
                        "friends", "prod", [req.params.accountId, req.params.friendId]
                    )
                }
            }
            else if (req.method == "POST") {
                if (friends.Friends.accepted.find(x => x.id == req.params.friendId) != undefined) {
                    res.status(409).json(
                        "errors.com.epicgames.friends.friend_request_already_sent", 14014,
                        `Friendship between ${req.params.accountId} and ${req.params.friendId} already exists.`,
                        "friends", "prod", [req.params.friendId]
                    )

                } else if (friends.Friends.outgoing.find(x => x.id == req.params.friendId) != undefined) {
                    res.status(409).json(errors.create(
                        "errors.com.epicgames.friends.friend_request_already_sent", 14014,
                        `Friendship request has already been sent to ${req.params.friendId}`,
                        "friends", "prod", [req.params.friendId]
                    ))
                } else if (friends.Friends.incoming.find(x => x.id == req.params.friendId) != undefined) {
                    await User.updateOne({ id: req.params.accountId }, { $pull: { ["Friends.incoming"]: { id: req.params.friendId } }, $push: { ["Friends.accepted"]: { id: req.params.friendId, createdAt: new Date() } } })
                    await User.updateOne({ id: req.params.friendId }, { $pull: { ["Friends.outgoing"]: { id: req.params.accountId } }, $push: { ["Friends.accepted"]: { id: req.params.accountId, createdAt: new Date() } } })
                    OMG.getPresenceFromUser(req.params.accountId, req.params.friendId, false);
                    OMG.getPresenceFromUser(req.params.friendId, req.params.accountId, false);

                    res.status(204).end()
                } else {
                    await User.updateOne({ id: req.params.accountId }, { $push: { ["Friends.outgoing"]: { id: req.params.friendId, createdAt: new Date() } } })
                    await User.updateOne({ id: req.params.friendId }, { $push: { ["Friends.incoming"]: { id: req.params.accountId, createdAt: new Date() } } })
                    //OMG.getPresenceFromUser(req.params.accountId, req.params.friendId, false);
                    //   OMG.getPresenceFromUser(req.params.friendId, req.params.accountId, false);
                    sendFriendReq(sender.accountId, receiver.accountId)
                    res.status(204).end()
                }
            } else {
                // delete or something eh
            }

        })

        application.get("/friends/api/public/friends/:accountId", async (req, res) => {
            var friends = await User.findOne({ id: req.params.accountId }).lean().catch(e => next(e))
            //console.log(friends["Friends"]["incoming"])
            if (friends) {
                var test = []
                for (const index of friends["Friends"]["incoming"]) {
                //    console.log(index)
                    test.push({
                        accountId: index.id,
                        status: "PENDING",
                        direction: "INBOUND",
                        created: index.createdAt,
                        favorite: false
                    })
                }
                var outgoing = []
                for (const index of friends["Friends"]["outgoing"]) {
                   // console.log(index)
                    test.push({
                        accountId: index.id,
                        status: "PENDING",
                        direction: "OUTBOUND",
                        created: index.createdAt,
                        favorite: false
                    })
                }
                var accepted = []
                for (const index of friends["Friends"]["accepted"]) {
                  //  console.log(index)
                    test.push({
                        accountId: index.id,
                        status: "ACCEPTED",
                        direction: "INBOUND",
                        created: index.createdAt,
                        favorite: false
                    })
                }
                res.json(test)
                /* res.json({
                     friends: accepted,
                     incoming: incoming,
                     outgoing: outgoing,
                     suggested: [{
                         "accountId": "b197bb1cf8e71dda62c746396037769c",
                         "mutual": 0
                     }],
                     blocklist: [],
                     settings: {
                         acceptInvites: "public"
                     }
                 })*/
            } else {
                res.json({
                    friends: [],
                    incoming: [],
                    outgoing: [],
                    suggested: [],
                    blocklist: [],
                    settings: {
                        acceptInvites: "public"
                    }
                })
            }
        })
    }
}


async function validateFriendAdd(accountId, friendId) {
    let sender = await User.findOne({ id: accountId }).lean();
    let receiver = await User.findOne({ id: friendId }).lean();
    if (!sender || !receiver) return false;

    if (sender["friends"]["accepted"].find(i => i.accountId == receiver.accountId) || receiver.list.accepted.find(i => i.accountId == sender.accountId)) return false;
    // if (sender["friends"]["blocked"].find(i => i.accountId == receiver.accountId) || receiver.list.blocked.find(i => i.accountId == sender.accountId)) return false; -- if added enable

    return true;
}


async function sendFriendReq(fromId, toId) {
    if (!await validateFriendAdd(fromId, toId)) return false;

    let from = await User.findOne({ id: fromId });
    let fromFriends = from["friends"];

    let to = await User.findOne({ id: toId });
    let toFriends = to["friends"];

    //  if (fromFriends.blocked.find(i => i.accountId == to.accountId)) return;
    //   if (toFriends.blocked.find(i => i.accountId == from.accountId)) return;

    fromFriends["outgoing"].push({ accountId: to.accountId, created: new Date().toISOString() });

    functions.sendXmppMessageToId({
        "payload": {
            "accountId": to.accountId,
            "status": "PENDING",
            "direction": "OUTBOUND",
            "created": new Date().toISOString(),
            "favorite": false
        },
        "type": "com.epicgames.friends.core.apiobjects.Friend",
        "timestamp": new Date().toISOString()
    }, from.accountId);

    toFriends["incoming"].push({ accountId: from.accountId, created: new Date().toISOString() });

    functions.sendXmppMessageToId({
        "payload": {
            "accountId": from.accountId,
            "status": "PENDING",
            "direction": "INBOUND",
            "created": new Date().toISOString(),
            "favorite": false
        },
        "type": "com.epicgames.friends.core.apiobjects.Friend",
        "timestamp": new Date().toISOString()
    }, to.accountId);

    await from.updateOne({ $set: { friends: fromFriends } });
    await to.updateOne({ $set: { friends: toFriends } });

    return true;
}


module.exports = new Friends;