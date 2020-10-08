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
var Member_1 = __importDefault(require("./Member"));
var Guild = /** @class */ (function () {
    function Guild() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Guild.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Guild.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Guild.prototype, "whatsapp", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Guild.prototype, "discord", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Guild.prototype, "teamspeak", void 0);
    __decorate([
        typeorm_1.Column({ name: 'owner_id' }),
        __metadata("design:type", String)
    ], Guild.prototype, "ownerId", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({ name: 'created_at' }),
        __metadata("design:type", Date)
    ], Guild.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({ name: 'updated_at' }),
        __metadata("design:type", Date)
    ], Guild.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Member_1.default; }, function (member) { return member.guildId; }),
        __metadata("design:type", Array)
    ], Guild.prototype, "members", void 0);
    Guild = __decorate([
        typeorm_1.Entity('guilds')
    ], Guild);
    return Guild;
}());
exports.default = Guild;
