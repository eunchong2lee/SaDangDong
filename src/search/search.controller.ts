import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { SearchService } from "./search.service";
import { CreateSearchDto } from "./dto/create-search.dto";
import { UpdateSearchDto } from "./dto/update-search.dto";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags("Search")
@Controller("api/search")
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @ApiQuery({
        name: "name",
        required: true,
        description: "name = value",
    })
    @ApiQuery({
        name: "tab",
        required: true,
        description: "tab = collection, item, auction",
    })
    @ApiOperation({
        summary: "검색",
        description: "검색 페이지",
    })
    @Get()
    create(@Body() createSearchDto: CreateSearchDto) {
        return this.searchService.create(createSearchDto);
    }
}