"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = __importDefault(require("./User"));
var Guild_1 = __importDefault(require("./Guild"));
var Member = /** @class */ (function () {
    function Member() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Member.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Member.prototype, "job", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Member.prototype, "privilege", void 0);
    __decorate([
        typeorm_1.OneToOne(function () { return User_1.default; }),
        typeorm_1.JoinColumn({ name: 'user_id' }),
        __metadata("design:type", String)
    ], Member.prototype, "userId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Guild_1.default; }, function (guild) { return guild.members; }),
        typeorm_1.JoinColumn({ name: 'guild_id' }),
        __metadata("design:type", String)
    ], Member.prototype, "guildId", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({ name: 'created_at' }),
        __metadata("design:type", Date)
    ], Member.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({ name: 'updated_at' }),
        __metadata("design:type", Date)
    ], Member.prototype, "updatedAt", void 0);
    Member = __decorate([
        typeorm_1.Entity('members')
    ], Member);
    return Member;
}());
exports.default = Member;
