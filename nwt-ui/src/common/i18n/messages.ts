export const messages = {
    common: {
        noSelection: 'Es ist nichts selektiert',
        saveButton: 'Speichern',
        cancelButton: 'Abbruch'
    },
    crudActions: {
        edit: 'Ändern..',
        save: 'Speichern',
        delete: 'Löschen...',
        create: 'Neu...'
    },
    menu: {
        welcome: 'Übersicht',
        user: 'User',
        player: 'Spieler',
        cities: 'Städte',
        storages: 'Lager',
        favorites: 'Lesezeichen'
    },
    welcomePage: {
        appBarTitle: 'Willkommen zu den New World Tools',
        description: 'Hier werden alle Daten der New World Inhalte angezeigt, z.B. Spieler, Welten, Städte, Lager,...'
    },
    citiesTable: {
        world: 'Welt',
        city: 'Stadt',
        details: 'Details',
        actions: 'Aktionen',
        noSelection: 'Es ist keine Stadt in der Tabelle selektiert'
    },
    cityDetails: {
        title: (name: string) => `Die Eigenschaften von ${name}`,
        name: 'Name',
        details: 'City Details'
    },
    citiesItemsTable: {
        noSelection: 'Es ist kein Gegenstand in der Tabelle selektiert',
        world: 'Welt',
        city: 'Stadt',
        name: 'Name',
        category: 'Kategorie',
        quantity: 'Anzahl',
        lager: 'Lager',
        actions: {
            delete: 'Löschen'
        }
    },
    usersView: {
        noSelection: (startPage: string) => `Es sind keine Daten geladen. Bitte auf ${startPage} klicken`
    }
}