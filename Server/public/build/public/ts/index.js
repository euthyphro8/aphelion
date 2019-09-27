var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = /** @class */ (function () {
    function Main() {
        var _this = this;
        var btn = document.getElementById("populate");
        btn.onclick = function () { return _this.populateData(); };
    }
    Main.prototype.populateData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tableBody, url, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tableBody = document.getElementById("table-body");
                        url = "https://cs4350.herokuapp.com/demo/all";
                        return [4 /*yield*/, this.loadData(url)];
                    case 1:
                        data = _a.sent();
                        tableBody.innerHTML = this.createHtmlFromArray(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadData = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Main.prototype.createHtmlFromArray = function (dataArray) {
        var listHtml = "";
        var template = document.getElementById("table-template");
        var templateHtml = template.innerHTML;
        for (var index = 0; index < dataArray.length; index++) {
            listHtml += templateHtml.replace(/{{id}}/g, dataArray[index].id);
            listHtml += templateHtml.replace(/{{name}}/g, dataArray[index].name);
            listHtml += templateHtml.replace(/{{username}}/g, dataArray[index].username);
            listHtml += templateHtml.replace(/{{email}}/g, dataArray[index].email);
            listHtml += templateHtml.replace(/{{address}}/g, dataArray[index].address);
            listHtml += templateHtml.replace(/{{phone}}/g, dataArray[index].phone);
            listHtml += templateHtml.replace(/{{website}}/g, dataArray[index].website);
            listHtml += templateHtml.replace(/{{company}}/g, dataArray[index].company);
            listHtml += templateHtml.replace(/{{avatar}}/g, dataArray[index].avatar);
        }
        return listHtml;
    };
    return Main;
}());
export { Main };
new Main();
//# sourceMappingURL=index.js.map