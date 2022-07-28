import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Collection } from "src/collections/entities/collection.entity";
import { Item } from "src/items/entities/item.entity";
import { Auction } from "src/auctions/entities/auction.entity";
import { User } from "src/users/entities/user.entity";
import { Offset } from "src/plug/pagination.function";
import { date_calculate } from "src/plug/caculation.function";

@Injectable()
export class SearchService {
    constructor(
        @InjectRepository(Collection)
        private collectionRepository: Repository<Collection>,
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,
        @InjectRepository(Auction)
        private auctionRepository: Repository<Auction>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async searchInfo(tab: string, name: string, _page: number, _limit: number, address: string) {
        try {
            if (address == `"NOT DEFINED"`) {
                console.log("유저가 없습니다.");
                address = undefined;
            }
            if (_page == NaN) _page = 0;
            if (_limit == NaN) _limit = 12;
            const start = Offset(_page, _limit);
            let information;

            if (tab === "collection" || tab === undefined) {
                console.log(1);
                information = await this.collectionRepository.query(` 
                (SELECT collection.name, collection.description, collection.feature_image, collection.created_at,
                collection.address, user.name AS user_name, user.profile_image
                FROM collection
                    LEFT JOIN user
                    ON collection.address = user.address
                WHERE collection.name like "%${name}%") 
                UNION
                (SELECT collection.name, collection.description, collection.feature_image, collection.created_at,
                collection.address, user.name AS user_name, user.profile_image
                FROM collection
                    LEFT JOIN user
                    ON collection.address = user.address
                WHERE user.name like "%${name}%")
                ORDER BY created_at DESC
                LIMIT ${start}, ${_limit}
                `);
                console.log(information);
            }

            if (tab === "item") {
                information = await this.itemRepository.query(`
                SELECT DISTINCT item.name, item.owner, item.image, item.created_at,
                user.name AS user_name, user.address, favorites_relation.count
                FROM item, user, favorites_relation
                WHERE item.address = user.address
                AND item.name like '%${name}%' 
                AND item.token_id = favorites_relation.token_id
                ORDER BY item.created_at DESC
                LIMIT ${start}, ${_limit}
                `);
                console.log(information);
            }

            if (tab === "auction") {
                information = await this.auctionRepository.query(`
                SELECT DISTINCT item.token_id, item.name, item.address, item.image,
                user.name AS user_name, user.address, favorites_relation.count,
                auction.id AS auction_id, auction.ended_at, auction.started_at
                FROM auction, item, user, favorites_relation
                WHERE item.address = user.address
                AND item.name like '%${name}%'
                AND item.token_id = favorites_relation.token_id
                AND auction.token_id = item.token_id
                AND auction.progress = true
                ORDER BY auction.started_at DESC
                LIMIT ${start}, ${_limit}
                `);
                information.forEach((element) => {
                    const ended_at = date_calculate(element.ended_at);
                    element.ended_at = ended_at;
                });

                console.log(information);
            }
            return Object.assign({
                statusCode: 200,
                success: true,
                statusMsg: `${tab}의 검색 목록을 불러왔습니다.`,
                data: information,
            });
        } catch (error) {
            console.log(error.message);
            throw new BadRequestException(error.message);
        }
    }
}
