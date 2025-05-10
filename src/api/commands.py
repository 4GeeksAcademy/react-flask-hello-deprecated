


import click
from api.models import db, User, Food, Accessories, Pet
from flask_bcrypt import Bcrypt 

bcrypt = Bcrypt()

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
            user.password = bcrypt.generate_password_hash("123456").decode('utf-8') 
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
        catfood.description = "KA AYURVEDA Only Fish es el primer pienso SIN GLUTEN y elaborado sólo con pescado azul. Alimento REALMENTE HIPOALERGÉNICO y de gran digestibilidad. Agregamos a nuestra receta un ingrediente poco conocido, como es la harina de algarroba, cuyas propiedades nutricionales, suponen toda una revolución."
        catfood.ingredients = "Salmón atlántico deshidratado e hidrolizado min. 21%, arenques deshidratados e hidrolizados 12%, anchoveta deshidratada e hidrolizada 9%, atún deshidratado e hidrolizado 6%, arroz integral, legumbre, levadura de cerveza (Saccharomyces cerevisae), aceite de salmón rico en Omega 3, harina de algarroba, Krill antártico (Euphausia Superba), complejo condroprotector (hidrocloruro de glucosamina, sulfato de condroitina), extracto de mejillón de labios verdes (Perna canaliculus), extracto de Yuca schidigera, manano-oligosacáridos, fructo-oligosacáridos, taurina (2000), caléndula, salvia, fenogreco, equinácea, eneldo, diente de león, té verde, tomillo, romero, cinc quelado, antioxidantes naturales, complejo vitamínico mineral, probióticos (E.faecium NCIMB 1041520×106 UFC), L-carnitina."
        catfood.weight = 1.5
        catfood.price = 6.42
        catfood.animal_type = "gato"
        catfood.age = "adulto"
        catfood.pathologies = "hipoalergénico"
        catfood.url = "https://era2vrmzk5n.exactdn.com/wp-content/uploads/2022/09/Pienso-15K-croqPEZ-Ayurveda-gato-kasaludintegral-1080x1080pix.jpg?strip=all&lossy=1&w=648&ssl=1"
        db.session.add(catfood)
        db.session.commit()

        catfood = Food()
        catfood.name = "Farmina Vet Life Diabetic Gato"
        catfood.brand="Farmina"
        catfood.description = "Alimento para gatos adultos que facilita el control del aporte de glucosa en los casos de diabetes mellitus."
        catfood.ingredients = "Proteína de pollo deshidratada, gluten de maíz, avena, espelta, proteína de pescado hidrolizada, grasa de pollo, fibra de guisante, proteína de pescado deshidratada, huevos desecados, aceite de pescado, pulpa de remolacha desecada, semillas de lino, cloruro de potasio, inulina, fructo-oligosacáridos, extracto de levadura (fuente de manno-oligosacáridos), cáscaras y semillas de psyllium, cloruro de sodio, citrato de potasio, sulfato de calcio dihidratado, condroitín sulfato, glucosamina. Fuentes de hidratos de carbono: avena, espelta."
        catfood.weight = 0.4
        catfood.price = 6.99
        catfood.animal_type = "gato"
        catfood.age = "adulto"
        catfood.pathologies = "diabetes"
        catfood.url = "https://bixoto.com/media/catalog/product/cache/2e45ba69d70625e0fc47dbc2d34862e1/M/Y/MYNKvuY-920-2042_webp.png"
        db.session.add(catfood)
        db.session.commit()

        catfood = Food()
        catfood.name = "OWNAT GF PRIME KITTEN (CAT)"
        catfood.brand="Ownat"
        catfood.description = "Comida para gatos. Indicado para gatitos de 2 a 12 meses. Con un 50% de carne fresca de pollo y pavo, ofrece un aporte de energía elevado y muy rico en proteínas de alta calidad, que garantizan su óptimo crecimiento, así como el correcto desarrollo del sistema inmunitario del gatito."
        catfood.ingredients = "Pollo fresco* (mín. 25% antes de la extrusión), pavo fresco* (mín. 25% antes de la extrusión), cerdo deshidratado (13%), guisantes enteros* (9%), grasa avícola (preservada con antioxidantes naturales), hidrolizado de salmón, pollo deshidratado (5%), raíces de mandioca* (5%), pescados deshidratados (anchoveta, jurel y caballa), patata deshidratada* (3%), huevo deshidratado* (2%), levadura de cerveza* (1%), proteína hidrolizada de pollo, manzana* (1%), aceite de pescado (preservado con antioxidantes naturales), sal gema*, fructo y manano oligosacáridos, algas marinas deshidratadas* (500 mg/kg), glucosamina (500 mg/kg), yucca schidigera, condroitín sulfato (100 mg/kg), arándanos* (100 mg/kg), tomillo* (80 mg/kg), flor de manzanilla* (80 mg/kg), hinojo* (80 mg/kg), equinácea* (80 mg/kg), té verde* (80 mg/kg).*INGREDIENTES NATURALES"
        catfood.weight = 1.
        catfood.price = 10.70
        catfood.animal_type = "gato"
        catfood.age = "cachorro"
        catfood.pathologies = "ninguna"
        catfood.url = "https://www.tiendanimal.es/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dw55de3cf2/images/ownat_prime_gf_kitten_OWN31463.jpg?sw=780&sh=780&sm=fit&q=85"
        db.session.add(catfood)
        db.session.commit()

        catfood = Food()
        catfood.name = "Diet Vet Renal-Oxalate pienso para gatos"
        catfood.brand="Natural Greatness"
        catfood.description = "Si tu gato padece insuficiencia renal o cardíaca crónica, es esencial proporcionarle una dieta adaptada. Natural Greatness Diet Vet Renal-Oxalate ha sido especialmente desarrollado para ayudar a la función renal y cardíaca. Este pienso dietético para gatos adultos se caracteriza por una composición equilibrada con proteínas de alta calidad y un contenido reducido de sodio y fósforo."
        catfood.ingredients = "Pollo fresco (25 %), patatas, aceite de pollo (13 %), guisantes, proteína de patata, pavo y pollo deshidratados (8 %), proteína de guisante, pulpa de remolacha, hidrolizado de hígado de pavo y pollo (2 %), pescado azul deshidratado (1,6 %), aceite de pescado azul (1,1 %), cloruro potásico, citrato de tripotasio [sustancia alcalinizante urinaria] (0,5 %), levadura de cerveza, mezcla de frutas [arándanos y pera] (0,3 %), mezcla de verduras [chirivía, laurel, perejil y diente de león] (0,3 %), huevo entero deshidratado, extracto de malta, achicoria, hidrolizado de la pared celular de la levadura (fuente de MOS), inulina (FOS), glucosamina, condroitín sulfato."
        catfood.weight = 5.
        catfood.price = 46.99
        catfood.animal_type = "gato"
        catfood.age = "senior"
        catfood.pathologies = "renal"
        catfood.url = "https://media.zooplus.com/bilder/2/400/279797_pla_natural_greatness_diet_vet_renal_oxalate_5kg_hs_01_2.jpg"
        db.session.add(catfood)
        db.session.commit()

        catfood = Food()
        catfood.name = "Adulto Obesity "
        catfood.brand="Criadores Dietetic"
        catfood.description = "El pienso Criadores Dietetic Obesity para gatos es un alimento dietético desarrollado para reducir el exceso de peso. Una receta completa y equilibrada con un bajo contenido de energía y grasa que favorece la pérdida de peso de forma sencilla y sin pasar hambre. Su fórmula especial mejora la calidad de vida de tu felino con ingredientes seleccionados y componentes que promueven una buena salud articular."
        catfood.ingredients = "Pollo deshidratado y desgrasado (30%), Almidón de maíz, Gluten de maíz, Lignocelulosa, Proteína de patata, Arroz, Aceite de ave, Harina de ave hidrolizada, Maíz, Pulpa de remolacha, Proteína de arroz, Hidrolizado de hígado de ave, Aceite de pescado (2%), Levaduras, Sustancias minerales, Semillas de Psyllium (1%), Caléndula (0,1%), Inulina (FOS) (0,1%), Pared celular hidrolizada de levaduras (fuente de MOS) (0,1%), Glucosamina (300 mg/kg), Condroitina (200 mg/kg), Metilsulfonilmetano (MSM)."
        catfood.weight = 2.5
        catfood.price = 19.99
        catfood.animal_type = "gato"
        catfood.age = "adulto"
        catfood.pathologies = "obesidad"
        catfood.url = "https://www.tiendanimal.es/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dwfc3b7ec1/images/pienso_gato_criadores_dietetic_obesity_CRD8967_M.jpg?sw=780&sh=780&sm=fit&q=85"
        db.session.add(catfood)
        db.session.commit()
        



    @app.cli.command("insert_data_dogfood")
    def insert_data_food():
        dogfood = Food()
        dogfood.name = " Veterinary Diet Renal pienso para perros"
        dogfood.brand="Concept for Life "
        dogfood.description = "Pienso dietético para perros adultos con insuficiencia renal crónica. Bajo en fósforo y proteína para reducir la formación de cálculos de oxalato y de urato. Con propiedades alcalinizantes de la orina"
        dogfood.ingredients = "Arroz, 31,5 % maíz, grasa de ave, 4,7 % proteína de ave (rica en pollo, en parte deshidratada e hidrolizada), proteína de maíz, pulpa de remolacha deshidratada (desazucarada), gelatina (hidrolizada, HDP*), linaza, aceite de pescado, 1,5 % hígado de pollo (en parte deshidratado e hidrolizado, HDP*), aceite de girasol, carbonato de calcio, cloruro sódico, cloruro potásico, huevo (deshidratado), lignocelulosa, 0,3 % paredes celulares de levadura (ricas en manano-oligosacáridos y en beta-glucanos), 0,2 % citrato de potasio, inulina de achicoria, harina de algas (rica en DHA**)."
        dogfood.price = 7.99
        dogfood.pathologies = "renal"
        dogfood.animal_type = "perro"
        dogfood.age = "senior"
        dogfood.size = "medio"
        dogfood.weight = 1.
        dogfood.url = "https://media.zooplus.com/bilder/9/400/cfl_dog_renal_1kg_1000x1000_9.jpg"
        db.session.add(dogfood)
        db.session.commit()

        dogfood = Food()
        dogfood.name = "CARE DIGESTIVE (DOG)"
        dogfood.brand="ownat"
        dogfood.description = "Comida para perros. OWNAT CARE DIGESTIVE está indicado para perros con el tracto gastrointestinal sensible. Está elaborado de manera cuidadosa con ingredientes naturales, probióticos y prebióticos para favorecer la salud intestinal, promoviendo una flora intestinal equilibrada y una óptima digestión."
        dogfood.ingredients = "Pollo fresco* (mín. 20%) antes de la cocción), pollo deshidratado, raíces de mandioca*, batata deshidratada* (10%), maíz integral*, arroz integral* (7%), grasa avícola (preservada con antioxidantes naturales), salmón hidrolizado (6%), pescado deshidratado, vaina de algarroba*, proteína hidrolizada de pollo, pulpa de remolacha, aceite de salmón (preservado con antioxidantes naturales), levaduras (nucleótidos)* (1,5%), manzana* (1%), semilla de lino* (1%), sal gema*, alfalfa deshidratada*, raíces de achicoria (FOS)* (2 g/kg), extracto de levadura (MOS) (2 g/kg), algas marinas deshidratadas (Ascophyllum nodosum)* (500 mg/kg), yucca schidigera, arándanos* (100 mg/kg), raíces de harpagofito* (100 mg/kg), flor de manzanilla* (100 mg/kg), equinácea* (100 mg/kg), té verde* (100 mg/kg). *INGREDIENTES NATURALES"
        dogfood.price = 1.
        dogfood.pathologies = "diabetes"
        dogfood.animal_type = "perro"
        dogfood.age = "cachorro"
        dogfood.size = "grande"
        dogfood.weight = 1.
        dogfood.url = "https://www.tiendanimal.es/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dw9b40881f/images/pienso_perros_ownat_care_digestive_OWN031569.jpg.jpg?sw=780&sh=780&sm=fit&q=85"
        db.session.add(dogfood)
        db.session.commit()


        dogfood = Food()
        dogfood.name = "Weight Loss & Diabetes"
        dogfood.brand="Virbac W1 Veterinary HPM"
        dogfood.description = "El alimento dietético para perros tiene un bajo contenido energético y de azúcares totales. Es bajo en hidratos de carbono y se caracteriza por un índice glucémico bajo. En cambio, Virbac Veterinary HPM Dog Weight Loss & Diabetes W1 proporciona a su mascota abundante fibra bruta, que favorece una agradable sensación de saciedad. La receta no contiene trigo, gluten, soja ni carne de vacuno, por lo que es bien tolerada por muchos perros."
        dogfood.ingredients = "Proteínas deshidratadas de cerdo y de ave, fécula de patata, lignocelulosa, hidrolizado de proteínas de cerdo y de ave, cáscaras de judías, grasa animal, minerales, linaza, pulpa de remolacha deshidratada, fibra de psyllium"
        dogfood.price = 12.99
        dogfood.pathologies = "diabetes"
        dogfood.animal_type = "perro"
        dogfood.age = "adulto"
        dogfood.size = "medio"
        dogfood.weight = 1.5
        dogfood.url = "https://www.tiendanimal.es/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dw6af74272/images/virbac_pienso_perros_hpm_weight_loss_diabetes_VIRAD360106.jpg?sw=780&sh=780&sm=fit&q=85"
        db.session.add(dogfood)
        db.session.commit()

        dogfood = Food()
        dogfood.name = "Adult Light Sterilised Pavo y patata - SIN CEREALES"
        dogfood.brand="Briantos"
        dogfood.description = "Briantos ofrece el alimento adecuado para todas las necesidades. Nuestras recetas sin cereales cuentan con una alta tolerancia entre los perros. El mayor contenido de humedad convence incluso a los perros más quisquillosos. La alta calidad de los ingredientes utilizados en la elaboración de este alimento y todos los controles de calidad durante la producción garantizan el mejor producto para tu perro."
        dogfood.ingredients = "5 por ciento de proteínas de pavo (deshidratadas), (22 %) de patatas (deshidratadas), fécula de patata (deshidratada), celulosa, 5 % de boniatos (deshidratados), pulpa de remolacha deshidratada (desazucarada), grasa de ave, proteínas de ave (deshidratadas), hidrolizado de proteínas, guisantes (deshidratados), fosfato monocálcico, aceite de pescado, achicoria (deshidratada), levadura (deshidratada), psilio, cloruro sódico, apio (deshidratado), zanahorias (deshidratadas)."
        dogfood.price = 33.99
        dogfood.pathologies = "ninguna"
        dogfood.animal_type = "perro"
        dogfood.age = "adulto"
        dogfood.size = "grande"
        dogfood.weight = 12.
        dogfood.url = "https://media.zooplus.com/bilder/2/400/briantos_adult_gf_sterilised_turkey_12kg_1000x1000_2.jpg"
        db.session.add(dogfood)
        db.session.commit()

        dogfood = Food()
        dogfood.name = "Concept for Life Mini Sterilised"
        dogfood.brand="Concept for Life"
        dogfood.description = "Un mayor contenido de proteínas combinadas con la L-carnitina, así como un ajustado contenido energético y en grasas (-11 % en comparación con Concept for Life Mini Adult) puede influir ayudar a mantener el peso ideal mediante una alimentación adecuada. De este modo, se puede evitar el aumento de peso causado por la alteración del metabolismo tras la castración. Además, las fibras dietéticas seleccionadas de psilio y lignocelulosa proporcionan una sensación de saciedad, lo que puede favorecer una ingesta menor de energía."
        dogfood.ingredients = "proteína de ave (31 % parcialmente deshidratada e hidrolizada), carne de pollo fresca (20 %), copos de patata, guisantes, fécula de patata, lignocelulosa (5,4 %), pulpa de remolacha seca, grasa de ave, linaza, pulpa de manzana, aceite de salmón (0,25 %), cloruro de sodio, aceite de girasol (0,15 %), inulina de achicoria (0,2 %), psilio (0,1 %)."
        dogfood.price = 5.49
        dogfood.pathologies = "ninguna"
        dogfood.animal_type = "perro"
        dogfood.age = "adulto"
        dogfood.size = "pequeña"
        dogfood.weight = 1.
        dogfood.url = "https://media.zooplus.com/bilder/7/400/pla_163496_cfl_dog_sterilised_mini_1kg_7.jpg"
        db.session.add(dogfood)
        db.session.commit()
      
      
    @app.cli.command("insert_data_exoticfood")
    def insert_data_exoticfood():
        exoticfood = Food()
        exoticfood.name = "Special Edition Harmony"
        exoticfood.brand="KaninchenTraum"
        exoticfood.description = "bunny KaninchenTraum Special Edition Harmony es el alimento ideal para tu conejo enano. Su mezcla única de 63 plantas y hierbas de praderas no tratadas ofrece una alimentación natural y variada. Los ingredientes cuidadosamente seleccionados, sobre todo las flores de aciano y siempreviva, garantizan una experiencia aromática y llena sabor que le encantará a tu amiguito."
        exoticfood.ingredients = "Hierbas de pasto permanente (fleo de los prados, festuca de los prados, festuca roja, hierba de cola de zorra, pasto azul de Kentucky, dactilo, perifollo silvestre, falso diente de león, arveja de campo, milenrama común, alquimila, cerrillo, trébol amarillo, llantén menor, salvia de los prados, briza media, bromo erguido, campanilla silvestre, alcaravea, cártamo silvestre, cerastio común, cardo borriquero, bromo blando, diente de león común, hierba capilar, ulmaria, cerastio de campo, fresa silvestre, arveja silvestre, gallineta blanca, crepis de los prados, galio amarillo, avénula pelosa, lotus común, cola de caballo, galio blanco, geranio blanco de campo, margarita de campo, viuda silvestre, flor de cuclillo, arroyuela, verónica de los campos, hierba triguera, poa de los prados, llantén mediano, pimpinela mayor, alverjilla, nomeolvides silvestre, saxifraga blanca, pimpinela mayor, cincoenrama, primavera común, conejera cabizbaja, pimpinela menor, estelaria, barba de cabra, ortiga mayor, ontineta, trébol rojo, arveja de los setos, búgula de Ginebra, egopodio, margarita), cáscaras de avena, harina de extracción de semilla de girasol, harina de extracción de lino, pulpa de manzana, bagazo de zanahoria, salvado de trigo, harina de extracción de semillas de colza, flor de aciano rojo (2 %), flores de siempreviva (1 %), semillas de hinojo (0,5 %), papaya deshidratada, flores de camomila."
        exoticfood.price = 14.69
        exoticfood.pathologies = "ninguna"
        exoticfood.animal_type = "exotico"
        exoticfood.age = "adulto"
        exoticfood.weight = 1.5
        exoticfood.url = "https://media.zooplus.com/bilder/7/400/547507_pla_bunny_kaninchentraum_special_edition_harmony_1_5k_hs_01_7.jpg"
        db.session.add(exoticfood)
        db.session.commit()

        exoticfood = Food()
        exoticfood.name = "Sbeaphar Care+ comida para conejos"
        exoticfood.brand="beaphar Care+"
        exoticfood.description = "Fórmula todo en uno: la comida beaphar Care+ está constituida por gránulos de composición uniforme. Esto permite evitar las carencias nutricionales que se pueden dar por la alimentación selectiva de tu conejo. Su fórmula equilibrada y sin azúcar ha sido elaborada por veterinarios y científicos expertos. Contiene un 25 % de extruido de fibra cruda y una cantidad elevada de nutrientes y otras sustancias vitales. La dureza de los gránulos favorece la abrasión dental y la higiene bucal."
        exoticfood.price = 26.49
        exoticfood.ingredients = "Subproductos vegetales (Yucca Schidigera 0,1 %, Echinacea 0,03 %, extracto de té verde 0,03 %, FOS 0,01 %) , cereales, verduras, minerales, levadura  (MOS 0,1 %), semillas, algas (espirulina 0,01 %)."
        exoticfood.pathologies = "diabetes"
        exoticfood.animal_type = "exotico"
        exoticfood.age = "senior"
        exoticfood.weight = 5.
        exoticfood.url = "https://media.zooplus.com/bilder/0/400/73777_pla_beaphar_care_kaninchen_5kg_hs_1_2_0.jpg"
        db.session.add(exoticfood)
        db.session.commit()

        exoticfood = Food()
        exoticfood.name = "Cuni Junior para conejos"
        exoticfood.brand="beaphar Care+"
        exoticfood.description = "Alimento variado y rico en fibra como base para el crecimiento óptimo de los conejos y conejos enanos hasta los 8 meses de edad. Nature Cuni Junior contiene una gran cantidad de hierbas, semillas y hierbas aromáticas sabrosas, combinadas con verduras y frutos que suministran altas dosis de vitaminas, minerales y oligoelementos. Sin cereales añadidos."
        exoticfood.price = 9.99
        exoticfood.ingredients = "Subproductos vegetales (hierba timotea, 20 % hierbas y hierbas aromáticas), verdura (18,1 % guisantes, 5,4 % zanahorias, 4 % frijol chícharo, 4 % remolacha), frutos, semillas, extracto de proteína vegetal, minerales, aceites y grasas, FOS, caléndula, MOS, algas, yuca."
        exoticfood.pathologies = "ninguna"
        exoticfood.animal_type = "exotico"
        exoticfood.age = "cachorro"
        exoticfood.weight = 2.3
        exoticfood.url = "https://d7rh5s3nxmpy4.cloudfront.net/CMP9365/8/18407_347074-D.jpg"
        db.session.add(exoticfood)
        db.session.commit()
        
        exoticfood = Food()
        exoticfood.name = "JR Farm Grainless Complete para conejos enanos"
        exoticfood.brand="JR Farm Grainless"
        exoticfood.description = "Mezcla natural y totalmente apropiada para esta especie. Hecha a base de hierbas aromáticas, deliciosas flores y verduras con vitaminas. No contiene cereales ni subproductos de cereales."
        exoticfood.price = 8.69
        exoticfood.ingredients = "Fleo, dáctilo, hierbas, perejil, copos de guisantes, dados de zanahoria, habas, chirivía, hojas de menta, hinojo, dados de manzana, semilla de lino, hojas de diente de león, remolacha, hojas de ortiga, flor de manzanilla, comino y vitaminas."
        exoticfood.pathologies = "escorbuto"
        exoticfood.animal_type = "exotico"
        exoticfood.age = "senior"
        exoticfood.weight = 2.3
        exoticfood.url = "https://media.zooplus.com/bilder/5/400/28140_pla_jrfarm_grainless_complete_zwergkaninchen_5.jpg"
        db.session.add(exoticfood)
        db.session.commit()
    
    @app.cli.command("insert_data_accessories")
    def insert_data_accessories():
        accessories= Accessories()
        accessories.name = "Collarín de seguridad"
        accessories.brand="TIAKI"
        accessories.description = "El collar de seguridad TIAKI ofrece a tu perro una seguridad y un confort indispensables en todas sus aventuras. Está fabricado con una cincha ancha y resistente a los desgarros que resulta ideal para el uso diario, el entrenamiento o incluso las salidas de caza. Equipado con una práctica empuñadura , podrá intervenir con rapidez y seguridad en situaciones críticas para controlar a tu perro."
        accessories.price = 7.99
        accessories.animal_type = "perro"
        accessories.pathologies = ""
        accessories.url = "https://media.zooplus.com/bilder/4/400/518156_pla_tiaki_security_collar_s_fg_5107_4.jpg"
        db.session.add(accessories)
        db.session.commit()

        accessories= Accessories()
        accessories.name = "Rascadores de pared"
        accessories.brand="Modern Living para gatos"
        accessories.description = "Modern Living está diseñado para personas con mascotas que buscan sofisticación y durabilidad. Entendemos el esfuerzo que pones en la decoración de tu entorno y lo consciente que eres al ponerle más estilo y carácter a tu hogar. La armonía es nuestra pasión. Hacemos muebles y accesorios para mascotas con diseños únicos y llamativos que se integran de forma perfecta incluso en el hogar más elegante y merecen un lugar destacado. Eso siempre sin olvidarnos de las necesidades de tus mascotas."
        accessories.price = 35.99
        accessories.animal_type = "gato"
        accessories.pathologies = ""
        accessories.url = "https://media.zooplus.com/bilder/3/400/modern_living_kratzm_bel_f_r_katzen_zur_wandmontage_hs_01_3.jpg"
        db.session.add(accessories)
        db.session.commit()

        accessories= Accessories()
        accessories.name = "Caseta de plástico para perros"
        accessories.brand="Ferplast Dogvilla"
        accessories.description = "No sólo para tu amigo canino con alergia, la caseta para perros Dogvilla de Ferplast es un verdadero oasis de bienestar: las partículas de polvo y suciedad de superficies lisas se pueden limpiar sin dejar residuo alguno. ¡Los gérmenes no tendrán ninguna posibilidad! La espaciosa casita ahorra mucho espacio de manera única ya que la pared lateral es plegable gracias a unas bisagras. Las ranuras de ventilación del panel posterior pueden ajustarse manualmente mediante una palanquita para garantizar así un óptimo intercambio de aire. La abertura de la entrada está reforzada con aluminio para resistir los dientes de los perros y da a la caseta una estabilidad adicional."
        accessories.price = 199.99
        accessories.animal_type = "perro"
        accessories.pathologies = ""
        accessories.url = "https://www.ferplast.es/cdn/shop/files/1-0180017573_x620.jpg?v=1728917798"
        db.session.add(accessories)
        db.session.commit()

        accessories= Accessories()
        accessories.name = "Campo de zanahorias juguete de inteligencia"
        accessories.brand="TIAKI"
        accessories.description = "El juguete de inteligencia TIAKI para pequeños animales es un juguete maravilloso que estimula el comportamiento natural de búsqueda de comida y juego de conejos, hámsters y cobayas. Este juguete interactivo tiene una serie de zanahorias de madera que ofrecen a tus mascotas un divertido reto , por ejemplo, arrancarlas y roerlas. La zona de juegos no solo es entretenida, sino también segura para que tus animales la roan, ya que está hecha de papel, madera de pino y hojas de maíz."
        accessories.price = 7.99
        accessories.animal_type = "exotico"
        accessories.pathologies = ""
        accessories.url = "https://media.zooplus.com/bilder/7/400/451140_pla_tiaki_intelligence_toy_carrot_patch_fg_9772_7.jpg"
        db.session.add(accessories)
        db.session.commit()
    

        accessories= Accessories()
        accessories.name = "Bayer Vetriderm loción tópica antialérgica"
        accessories.brand="Bayer Vetriderm"
        accessories.description = "Gracias a la loción tópica Vetriderm, de Bayer, es posible reducir de manera efectiva la causa de las reacciones alérgicas a los animales domésticos. Simplemente, aplica la solución sobre un paño y, con ayuda de este, extiende el producto sobre el pelo de tu perro o gato; primero en la dirección del crecimiento del pelo y después en el sentido opuesto. De este modo, eliminarás las partículas que quedan en el pelaje como los epitelios o los restos de saliva o de orina, que pueden producir reacciones alérgicas."
        accessories.price = 21.99
        accessories.animal_type = "exotico"
        accessories.pathologies = ""
        accessories.url = "https://media.zooplus.com/bilder/7/400/73160_pla_vetriderm_350ml_hs_01_7.jpg"
        db.session.add(accessories)
        db.session.commit()
        
    @app.cli.command("insert_data_pet")
    def insert_data_pet():
        pet= Pet()
        pet.name = ""
        pet.size=""
        pet.breed= "asd"
        pet.age= "cachorro"
        pet.animal_type = "gato"
        pet.pathologies="diabetes"
        pet.user_id = 1
        db.session.add(pet)
        db.session.commit()
        
        pet= Pet()
        pet.name = "recoleto"
        pet.size="medio"
        pet.breed= "asd"
        pet.age="senior"
        pet.animal_type = "perro"
        pet.pathologies="renal"
        pet.user_id = 1
        db.session.add(pet)
        db.session.commit()
        
        pet= Pet()
        pet.name = "peluso"
        pet.size="grande"
        pet.breed= "asd"
        pet.age="cachorro"
        pet.animal_type = "perro"
        pet.pathologies="diabetes"
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
        pet.user_id = 1
        db.session.add(pet)
        db.session.commit()
        
        pet= Pet()
        pet.name = "asd"
        pet.size="oxbow"
        pet.breed= "asd"
        pet.age= "60"
        pet.animal_type = "loro"
        pet.pathologies=""
        pet.user_id = 1
        db.session.add(pet)
        db.session.commit()


    

    




    

    




    

    