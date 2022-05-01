module.exports = {
    /**
     * 審査員の最大数
     */
    maxReviewerNum: 5,
    rep: {},
    sendData: {},

    init: async function (nodecg) {
        this.rep = nodecg.Replicant("reviewData");
        await this.rep.on("change", newVal => {
            this.sendData = this.rep.value;
        });
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
            var currentMedley = { ...this.sendData.currentMedley };
            currentMedley.point = currentMedley.listenerPoint.actualPoint;
            var valid = true;
            currentMedley.reviewersPoint.forEach((elem, index) => {
                if (this.sendData.reviewers[index].isValid == true) {
                    if (elem != -1) {
                        currentMedley.point += elem;
                    } else {
                        valid = false;
                    }
                }
            });
            if (!valid) return false;
            currentMedley.point = Math.round(currentMedley.point * 100) / 100;
            this.sendData.currentMedley = { ...currentMedley };
            return true;
        }
        return false;
    },
    /**
     * 出力JSONデータの生成
     */
    jsonGen() {
        const jsonData = {
            reviewers: this.sendData.reviewers,
            medleys: this.sendData.medleys
        }
        return jsonData;
    },
    /**
     * 出力CSVデータの生成
     */
    csvGen() {
        var data = this.jsonGen();
        var csvHeader = `メドレー名,作者名,合計得点,${data.reviewers[0].name},${data.reviewers[1].name},${data.reviewers[2].name},${data.reviewers[3].name},${data.reviewers[4].name},視聴者投票,1割合,2割合,3割合,4割合,5割合\n`;
        var csvData = "";
        data.medleys.forEach((elem) => {
            csvData += `${elem.name},${elem.artist},${elem.point},${elem.reviewersPoint[0]},${elem.reviewersPoint[1]},${elem.reviewersPoint[2]},${elem.reviewersPoint[3]},${elem.reviewersPoint[4]},${elem.listenerPoint.actualPoint},${elem.listenerPoint.per[0]},${elem.listenerPoint.per[1]},${elem.listenerPoint.per[2]},${elem.listenerPoint.per[3]},${elem.listenerPoint.per[4]}\n`
        })
        return (csvHeader + csvData);
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