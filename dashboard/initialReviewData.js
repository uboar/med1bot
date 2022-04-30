
var initialReviewData = {
    reviewers: [
        {
            name: "ダミー1",
            id: "",
            icon: "",
            isValid: false,
        },
        {
            name: "ダミー2",
            id: "",
            icon: "",
            isValid: false,
        },
        {
            name: "ダミー3",
            id: "",
            icon: "",
            isValid: false,
        },
        {
            name: "ダミー4",
            id: "",
            icon: "",
            isValid: false,
        },
        {
            name: "ダミー5",
            id: "",
            icon: "",
            isValid: false,
        }
    ],
    medleys: [

    ],
    currentMedley: {
        name: "メドレー名",
        artist: "作者名",
        point: -1,
        reviewersPoint: [-1, -1, -1, -1, -1],
        listenerPoint: {
            actualPoint: -1,
            per: [0, 0, 0, 0, 0],
        }
    },
    /**
     * 採点状況
     * 0：アイドル状態
     * -1 : 投票中
     * 他 : 投票終了
     */
    reviewingStatus: 0,
    show: false,
    memo: "",
}

module.exports = initialReviewData;