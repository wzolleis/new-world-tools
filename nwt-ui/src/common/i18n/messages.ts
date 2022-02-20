export const messages = {
    common: {
        noSelection: (startPage: string) => `Es sind keine Daten geladen. Bitte auf ${startPage} klicken`,
        saveButton: 'Speichern',
        cancelButton: 'Abbruch',
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
        noSelection: 'Bitte eine Stadt auswählen',
        addCity: 'Stadt hinzufügen',
        editCity: 'Stadt ändern',
        deleteCity: 'Stadt löschen'
    },
    cityDetails: {
        title: (name: string) => `Die Eigenschaften von ${name}`,
        name: 'Name',
        details: 'City Details'
    },
    cityEditor: {
        create: {
            title: 'Neue Stadt anlegen',
            description: 'Geben Sie die Eigenschaften der Stadt ein'
        },
        edit: {
            title: 'Stadt ändern'
        },
        fields: {
            name: 'Name',
            details: 'Details'
        }
    },
    citiesItemsTable: {
        noSelection: 'Bitte ein Item auswählen',
        unknownCity: 'Unbekannte Stadt',
        world: 'Welt',
        city: 'Stadt',
        name: 'Name',
        category: 'Kategorie',
        quantity: 'Anzahl',
        lager: 'Lager',
        actions: {
            add: 'Item hinzufügen',
            delete: 'Löschen'
        }
    },
    "userDetails": {
        userActive: 'ist angemeldet',
        players: 'Spieler',
        playersCount: 'Anzahl Spieler',
        userNotActive: 'nicht angemeldet'
    }
}

export const noDataMessage = messages.common.noSelection(messages.menu.welcome)