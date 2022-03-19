module.exports = {
    /**
     * 審査員の最大数
     */
    maxReviewerNum: 5,
    /**
     * EJSに送信するデータ
     */
    sendData: {
        backgroundColor: "#00FF00",
        height: "50vh",
        reviewingStatus: false,
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
    },
    /**
     * EJSに送信するデータの取得
     */
    getSendData() {
        return { data: JSON.stringify(this.sendData) };
    },

    /**
     * 現在のメドレー情報の反映
     */
    setCurrentMedleyData(name, artist) {
        this.sendData.currentMedley = {
            name: name,
            artist: artist,
            point: -1,
            reviewersPoint: [-1, -1, -1, -1, -1],
            listenerPoint: {
                actualPoint: -1,
                per: [0, 0, 0, 0, 0],
            },
        }

        return true;
    },
    /**
     * 全員の採点終了を確認する
     */
    checkReviewed() {
        if ((this.sendData.currentMedley.listenerPoint.actualPoint != -1)) {
            this.sendData.currentMedley.point = this.sendData.currentMedley.listenerPoint.actualPoint;
            var valid = true;
            this.sendData.currentMedley.reviewersPoint.forEach((elem, index) => {
                if (this.sendData.reviewers[index].isValid == true) {
                    if (elem != -1) {
                        this.sendData.currentMedley.point += elem;
                    } else {
                        valid = false;
                    }
                }
            });
            if (!valid) return false;
            this.sendData.currentMedley.point = Math.round(this.sendData.currentMedley.point * 100) / 100;

            this.sendData.medleys.push({ ...this.sendData.currentMedley });
            return true;
        }
        return false;
    },
    /**
     * 全データ初期化
     */
    clearAll() {
        this.sendData.reviewingStatus = 0;
        this.sendData.medleys = [];
        this.sendData.reviewers = [
            {
                isValid: false,
            },
            {
                isValid: false,
            },
            {
                isValid: false,
            },
            {
                isValid: false,
            },
            {
                isValid: false,
            },
        ];
        this.setCurrentMedleyData("", "");
        return true;
    }
}