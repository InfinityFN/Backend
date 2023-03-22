const mongoose = require('mongoose');
const data101 = mongoose.Schema({
    "id": String,
    "createdAt": Date,
    "displayName": String,
    "email": String,
    "password": String,
    "background": {
        type: String,
        default: "seasonx"
    },
    "backgroundurl": {
        type: String,
        default: "none"
    },
    "stats": {
        "solos": {
            "wins": {
                type: Number,
                default: 0
            },
            "kills": {
                type: Number,
                default: 0
            },
            "matchplayed": {
                type: Number,
                default: 0
            }
        },
        "duos": {
            "wins": {
                type: Number,
                default: 0
            },
            "kills": {
                type: Number,
                default: 0
            },
            "matchplayed": {
                type: Number,
                default: 0
            }
        },
        "squad": {
            "wins": {
                type: Number,
                default: 0
            },
            "kills": {
                type: Number,
                default: 0
            },
            "matchplayed": {
                type: Number,
                default: 0
            }
        },
        "ltm": {
            "wins": {
                type: Number,
                default: 0
            },
            "kills": {
                type: Number,
                default: 0
            },
            "matchplayed": {
                type: Number,
                default: 0
            }
        }
    },
    "profile": {
        "newestcosmetics": {
            type: Boolean,
            default: false
        },
        "banned": {
            type: Boolean,
            default: false
        },
        "optOutOfPublicLeaderboards": {
            type: Boolean,
            default: false
        },
        "allowsGifts": {
            type: Boolean,
            default: true
        },
        "musicpack": {
            "items": {
                type: String,
                default: ""
            },
            "activeVariants": {
                type: Array,
                default: []
            }
        },
        "character": {
            "items": {
                type: String,
                default: ""
            },
            "activeVariants": {
                type: Array,
                default: []
            }
        },
        "backpack": {
            "items": {
                type: String,
                default: ""
            },
            "activeVariants": {
                type: Array,
                default: []
            }
        },
        "skydivecontrail": {
            "items": {
                type: String,
                default: ""
            },
            "activeVariants": {
                type: Array,
                default: []
            }
        },
        "dance": {
            "items": {
                type: Array,
                default: [
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    ""
                ]
            },
            "activeVariants": {
                type: Array,
                default: []
            }
        },
        "loadingscreen": {
            "items": {
                type: String,
                default: ""
            },
            "activeVariants": {
                type: Array,
                default: []
            }
        },
        "stage": {
            "version": {
                type: String,
                default: "season12"
            },
            "imageurl": {
                type: String,
                default: "season12"
            }
        },
        "level": {
            type: Number,
            default: 1
        },
        "vbucks": {
            type: Number,
            default: 1000
        },
        "battlestars": {
            type: Number,
            default: 500
        },
        "gold": {
            type: Number,
            default: 500
        },
        "omnichips": {
            type: Number,
            default: 500
        },
        "gifts": {
            type: Array,
            default: [{
                giftbox: "GiftBox:gb_mfareward",
                giftedAt: new Date().toISOString(),
                message: "Thanks For Playing Infinity",
                itemGuid: "EID_BoogieDown",
                items: [{
                    templateId: "AthenaDance:EID_BoogieDown",
                    profileId: "common_core",
                    quantity: 1
                }]
            }]
        },
        "pickaxe": {
            "items": {
                type: String,
                default: ""
            },
            "activeVariants": {
                type: Array,
                default: []
            }
        },
        "glider": {
            "items": {
                type: String,
                default: ""
            },
            "activeVariants": {
                type: Array,
                default: []
            }
        },
        "itemwrap": {
            "items": {
                type: Array,
                default: [
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    ""
                ]
            },
            "activeVariants": {
                type: Array,
                default: []
            }
        },
        "banner": {
            "banner_icon": {
                type: String,
                default: "BRSeason01"
            },
            "banner_color": {
                type: String,
                default: "DefaultColor1"
            }
        },
        "purchased_season": {
            type: Array,
            default: []
        },
        "ItemShopPurchases": {
            type: Object,
            default: {}
        },
        "mtx_purchase_history": {
            type: Array,
            default: []
        },
	  "mtx_affiliate": {
            type: String,
            default: ""
        },
        "mtx_affiliate_set_time": {
            type: String,
            default: ""
        },
        "profilerevision": {
            type: Number,
            default: 0
        }
    },
    "Friends": {
        "incoming": {
            type: Array,
            default: []
        },
        "outgoing": {
            type: Array,
            default: []
        },
        "accepted": {
            type: Array,
            default: []
        }
    },
    "BattlePass": {
        "battlePassPurchased": {
            type: Boolean,
            default: false
        },
        "battlePassTier": {
            type: Number,
            default: 1
        },
        "battlePassXPBoost": {
            type: Number,
            default: 0
        },
        "battlePassXPFriendBoost": {
            type: Number,
            default: 0
        },
    },
    "Authorization": {
        type: String,
        required: true
    },
    "discord": String
})

module.exports = mongoose.model("user", data101);