import {
    createContext,
    useState,
    useEffect,
} from "react";
export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {

    const [favorites, setFavorites] = useState(() => {

    const saved = localStorage.getItem("favorites");

    return saved ? JSON.parse(saved) : [];

});

    const [collections, setCollections] = useState(() => {

    const saved = localStorage.getItem("collections");

    return saved
        ? JSON.parse(saved)
        : [
              {
                  id: 1,
                  name: "Weekend Cafes",
                  businesses: [],
              },
          ];

});
    /* -------------------------
        FAVORITES
    -------------------------- */

    const addFavorite = (business) => {

        const exists = favorites.find(
            (item) => item.id === business.id
        );

        if (!exists) {
            setFavorites((prev) => [...prev, business]);
        }

    };

    const removeFavorite = (id) => {

        setFavorites((prev) =>
            prev.filter((item) => item.id !== id)
        );

    };

    const toggleFavorite = (business) => {

        const exists = favorites.find(
            (item) => item.id === business.id
        );

        if (exists) {

            removeFavorite(business.id);

        } else {

            addFavorite(business);

        }

    };

    /* -------------------------
        COLLECTIONS
    -------------------------- */

    const createCollection = (name) => {

        const collection = {
            id: Date.now(),
            name,
            businesses: [],
        };

        setCollections((prev) => [
            ...prev,
            collection,
        ]);

    };

    const deleteCollection = (id) => {

        setCollections((prev) =>
            prev.filter(
                (collection) =>
                    collection.id !== id
            )
        );

    };

    const addBusinessToCollection = (
        collectionId,
        business
    ) => {

        setCollections((prev) =>
            prev.map((collection) => {

                if (collection.id !== collectionId)
                    return collection;

                const exists =
                    collection.businesses.find(
                        (item) =>
                            item.id === business.id
                    );

                if (exists) return collection;

                return {
                    ...collection,
                    businesses: [
                        ...collection.businesses,
                        business,
                    ],
                };

            })
        );

    };

    /* -------------------------
        NOTES
    -------------------------- */

    const addNote = (
        businessId,
        note
    ) => {

        setFavorites((prev) =>
            prev.map((business) =>
                business.id === businessId
                    ? {
                          ...business,
                          note,
                      }
                    : business
            )
        );

    };

    /* -------------------------
        TAGS
    -------------------------- */

    const addTag = (
        businessId,
        tag
    ) => {

        setFavorites((prev) =>
            prev.map((business) => {

                if (
                    business.id !== businessId
                )
                    return business;

                const tags =
                    business.tags || [];

                if (tags.includes(tag))
                    return business;

                return {
                    ...business,
                    tags: [...tags, tag],
                };

            })
        );

    };

    const removeTag = (
        businessId,
        tag
    ) => {

        setFavorites((prev) =>
            prev.map((business) => {

                if (
                    business.id !== businessId
                )
                    return business;

                return {
                    ...business,
                    tags:
                        business.tags?.filter(
                            (item) =>
                                item !== tag
                        ) || [],
                };

            })
        );

    };
    useEffect(() => {

    localStorage.setItem(
        "collections",
        JSON.stringify(collections)
    );

}, [collections]);

    useEffect(() => {

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

}, [favorites]);
    return (

        <FavoritesContext.Provider

            value={{

                favorites,

                collections,

                addFavorite,

                removeFavorite,

                toggleFavorite,

                createCollection,

                deleteCollection,

                addBusinessToCollection,

                addNote,

                addTag,

                removeTag,

            }}

        >

            {children}

        </FavoritesContext.Provider>

);
    

};

export default FavoritesProvider;