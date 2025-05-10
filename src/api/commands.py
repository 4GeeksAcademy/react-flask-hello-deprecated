
import click
from api.models import db, User, Food, Accessories, Pet

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.name = "name"+ str(x)
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.address = "asd"
            user.phone = 12324
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

    @app.cli.command("insert_data_catfood")
    def insert_data_catfood():
        catfood = Food()
        catfood.name = "KA AYURVEDA Only Fish Gatos Sin Gluten"
        catfood.brand="Feral"
        catfood.description = "asd"
        catfood.ingredients = "ads"
        catfood.weight = 1.
        catfood.price = 1.
        catfood.animal_type = "gato"
        catfood.age = "sd"
        catfood.pathologies = "asd"
        db.session.add(catfood)
        db.session.commit()
        



    @app.cli.command("insert_data_dogfood")
    def insert_data_food():
        dogfood = Food()
        dogfood.name = "Special Care hepatic/renal"
        dogfood.brand="nfnatcane"
        dogfood.description = "asd"
        dogfood.ingredients = "ads"
        dogfood.price = 1.
        dogfood.pathologies = "renal"
        dogfood.animal_type = "perro"
        dogfood.age = "senior"
        dogfood.size = "medium"
        dogfood.weight = 1.
        db.session.add(dogfood)
        db.session.commit()

        dogfood = Food()
        dogfood.name = "CARE DIGESTIVE (DOG)"
        dogfood.brand="ownat"
        dogfood.description = "asd"
        dogfood.ingredients = "ads"
        dogfood.price = 1.
        dogfood.pathologies = "renal"
        dogfood.animal_type = "perro"
        dogfood.age = "senior"
        dogfood.size = "medium"
        dogfood.weight = 1.
        db.session.add(dogfood)
        db.session.commit()
      


    @app.cli.command("insert_data_exoticfood")
    def insert_data_exoticfood():
        exoticfood = Food()
        exoticfood.name = "critical care"
        exoticfood.brand="oxbow"
        exoticfood.description = "asd"
        exoticfood.ingredients = "ads"
        exoticfood.price = 1.
        exoticfood.pathologies = "asd"
        exoticfood.animal_type = "exótico"
        exoticfood.age = "asd"
        exoticfood.weight = 1.
        db.session.add(exoticfood)
        db.session.commit()


    
    @app.cli.command("insert_data_accessories")
    def insert_data_accessories():
        accessories= Accessories()
        accessories.name = "critical care"
        accessories.brand="oxbow"
        accessories.description = "asd"
        accessories.price = 1.
        accessories.animal_type = ""
        accessories.pathologies = ""
        accessories.url = ""
        db.session.add(accessories)
        db.session.commit()

    
    @app.cli.command("insert_data_pet")
    def insert_data_pet():
        pet= Pet()
        pet.name = "asd"
        pet.size=""
        pet.breed= "asd"
        pet.age= "cachorro"
        pet.animal_type = "gato"
        pet.pathologies="obesidad, diabetes"
        pet.user_id = 1
        db.session.add(pet)
        db.session.commit()
        
        pet= Pet()
        pet.name = "recoleto"
        pet.size="medium"
        pet.breed= "asd"
        pet.age="senior"
        pet.animal_type = "perro"
        pet.pathologies="renal"
        pet.user_id = 1
        db.session.add(pet)
        db.session.commit()
        
        pet= Pet()
        pet.name = "asd"
        pet.size="oxbow"
        pet.breed= "asd"
        pet.age= "2"
        pet.animal_type = "cobaya"
        pet.pathologies="escorbuto"
        db.session.add(pet)
        db.session.commit()
        
        pet= Pet()
        pet.name = "asd"
        pet.size="oxbow"
        pet.breed= "asd"
        pet.age= "60"
        pet.animal_type = "loro"
        pet.pathologies=""
        db.session.add(pet)
        db.session.commit()


    

    

