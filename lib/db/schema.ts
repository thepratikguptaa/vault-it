/* eslint-disable @typescript-eslint/no-unused-vars */
import {pgTable, text, uuid, integer, boolean, timestamp} from 'drizzle-orm/pg-core'
import {relations} from 'drizzle-orm'

export const files = pgTable("files", {
    id: uuid("id").defaultRandom().primaryKey(),

    //basic file/folder information
    name: text("name").notNull(),
    path: text("path").notNull(), //document/project/resume
    size: integer("size").notNull(),
    type: text("type").notNull(), //file or folder

    //storage information
    fileUrl: text("file_url").notNull(), //url to access file
    thumbnailUrl: text("thumbnail_url"),

    //Ownership information
    userId: text("user_id").notNull(),
    parentId: uuid("parent_id"), //parent folder id (null for root items)

    //file/folder flags
    isFolder: boolean("is_folder").default(false).notNull(),
    isStarred: boolean("is_starred").default(false).notNull(),
    isTrash: boolean("is_trash").default(false).notNull(),

    //timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})