/**
 * Fetching all documents in a database to check if each document fits a particular criteria would be very slow.
 * In the relational world, this would be comparable in concept to a full table scan.
 * To solve this problem, Fauna implements indexes.
 * These are database entities that organize your data in such a way that they allow for efficient lookup of multiple documents.
 * Whenever you create new documents, the indexes that cover those documents are automatically updated.
 
    CreateIndex({
    name: "all_Pilots",
    source: Collection("Pilots")
    })

    Paginate(Match(Index("all_Pilots")))

 * Index returns a reference to an index.
 * Match accepts the index reference and returns a set, which is sort of like an abstract representation of the documents covered by the index. 
 * At this point, no data has been fetched yet.
 * Paginate takes the set returned by Match, reads the matching index entries, and returns a Page of results. 
 * In this case, this is simply an array of references. 
 * ----------------------
 * CreateCollection
 * CreateIndex
 */
